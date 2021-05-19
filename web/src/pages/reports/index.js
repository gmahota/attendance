import React, { Fragment, useRef, useState, useEffect } from "react";
import Router, { useRouter } from "next/router";
import styles from "../../styles/Home.module.css";
import { Menu, Dialog, Transition } from "@headlessui/react";
import { ExclamationIcon } from "@heroicons/react/outline";
import { DocumentReportIcon, ChevronDownIcon } from "@heroicons/react/solid";
import SectionTitle from "../../components/section-title";
import Widget from "../../components/widget";
import FilterReport from "../../components/attendance-reports/filter-report";
import groupService from "../../services/userGroup";
import userService from "../../services/user";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ReportIndividual({ allGroups }) {
  const router = useRouter();

  if (router.isFallback) {
    return <p>Carregando...</p>;
  }

  const handlerCreateReport = async () => {
    const res = await fetch(`http://localhost:5000/api/reports/individuals`)
      .then((response) => response.body)
      .then((rb) => {
        const reader = rb.getReader();

        return new ReadableStream({
          start(controller) {
            // The following function handles each data chunk
            function push() {
              // "done" is a Boolean and value a "Uint8Array"
              reader.read().then(({ done, value }) => {
                // If there is no more data to read
                if (done) {
                  console.log("done", done);
                  controller.close();
                  return;
                }
                // Get the data and send it to the browser via the controller
                controller.enqueue(value);
                // Check chunks by logging to the console
                console.log(done, value);
                push();
              });
            }

            push();
          },
        });
      })
      .then((stream) => {
        // Respond with our stream
        return new Response(stream, {
          headers: { "Content-Type": "text/html" },
        }).text();
      })
      .then((result) => {
        // Do things with result
        console.log(result);
      });

    console.log(res);
  };

  const DialogModal = (dialogProps) => {
    console.log(dialogProps);
    //dialogProps.open
    const listMonthsOptions = [
      { label: "Jan", value: 1 },
      { label: "Fev", value: 2 },
      { label: "Mar", value: 3 },
      { label: "Abr", value: 4 },
      { label: "Mai", value: 5 },
      { label: "Jun", value: 6 },
    ];

    var d = new Date();

    const [open, setOpen] = useState(dialogProps.open);
    const [title, setTitle] = useState(dialogProps.title);
    const [listMonths, setListMonths] = useState(listMonthsOptions);
    const [listGroups, setListGroups] = useState(dialogProps.listGroups);
    const [month, setMonth] = useState(d.getMonth());
    const [listUsers, setListUsers] = useState(dialogProps.listUsers);
    const cancelButtonRef = useRef();

    return (
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          static
          className="fixed z-10 inset-0 overflow-y-auto"
          initialFocus={cancelButtonRef}
          open={open}
          onClose={setOpen}
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      <DocumentReportIcon
                        className="h-6 w-6 text-red-600"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-lg leading-6 font-medium text-gray-900"
                      >
                        {title}
                      </Dialog.Title>
                      <div className="mt-2">
                        <div>Mês:</div>
                        <div>
                          <select className={`form-element `}>
                            {listMonths.map((item) => {
                              return (
                                <option key={item.value} value={item.value}>
                                  {item.label}{" "}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                      </div>
                      <div className="mt-2">
                        <div>Grupo</div>
                        <div>
                          <select>
                            {listGroups.map((item) => {
                              return (
                                <option key={item.value} value={item.value}>
                                  {item.label}{" "}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                      </div>
                      <div className="mt-2">
                        <div>Funcionarios</div>
                        <div>
                          <select>
                            {listUsers.map((item) => {
                              return (
                                <option key={item.value} value={item.value}>
                                  {item.label}{" "}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => setOpen(false)}
                  >
                    OK
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    );
  };
  const listGroupsOptions = [
    { label: "A001", value: "A001" },
    { label: "A002", value: "A002" },
  ];
  const listUsersOptions = [
    { label: "U001", value: "João Bastos" },
    { label: "U002", value: "Andre Santos" },
  ];

  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("Relatório");
  const [listGroups, setListGroups] = useState(allGroups);
  const [listUsers, setListUsers] = useState(listUsersOptions);

  return (
    <>
      <SectionTitle title="Report's" subtitle="Attendance Repots" />

      <Widget title="Filter" description={<span>Filter Conditions</span>}>
        <div className="w-full flex">
          <div className="w-full lg:w-1/2">
            <FilterReport />
          </div>
        </div>
      </Widget>
      <main className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.title}>Gerar Relatorios</h1>
          <div className={styles.grid}>
            <button
              className={styles.card}
              onClick={() => {
                setOpen(true);
                setTitle("Report Individual");
              }}
              //href="http://localhost:5000/api/reports/individuals"
            >
              <h3>Report 1</h3>
              <p>Report Individual</p>
            </button>
            <a
              className={styles.card}
              href="http://localhost:5000/api/reports/simplerep"
            >
              <h3>Report 2</h3>
              <p>Report Simple Report</p>
            </a>
          </div>
          <DialogModal
            title={title}
            open={open}
            listGroups={allGroups}
            listUsers={listUsers}
          ></DialogModal>
        </div>
      </main>
    </>
  );
}

export const getStaticProps = async () => {
  const allGroups = await groupService.get_Groups();
  const allUsers = await userService.get_Users();

  return {
    props: {
      allGroups,
      allUsers,
    },
  };
};
