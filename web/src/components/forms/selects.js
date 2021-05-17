export const Selects = ({ inline = false, item, selected }) => (
  <div className="form-element">
    {item.label && <div className="form-label">{item.label}</div>}
    <select
      ref={item.ref}
      name={item.name}
      className="form-select">
      {item.options.map((option, j) => (
        <option key={j} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
)

export const Select = ({ inline = false }) => (
  <div className={`form-element ${inline ? 'form-element-inline' : ''}`}>
    <div className="form-label">Label</div>
    <select className="form-select">
      <option>Option 1</option>
      <option>Option 2</option>
      <option>Option 3</option>
      <option>Option 4</option>
    </select>
    <div className="form-hint">This is a hint</div>
  </div>
)

export const InvalidSelect = ({ inline = false }) => (
  <div className={`form-element ${inline ? 'form-element-inline' : ''}`}>
    <div className="form-label">First name</div>
    <select className="form-select form-select-invalid">
      <option>Option 1</option>
      <option>Option 2</option>
      <option>Option 3</option>
      <option>Option 4</option>
    </select>
    <div className="form-error">First name is required</div>
  </div>
)

export const ValidSelect = ({ inline = false }) => (
  <div className={`form-element ${inline ? 'form-element-inline' : ''}`}>
    <div className="form-label">First name</div>
    <select className="form-select form-select-valid">
      <option>Option 1</option>
      <option>Option 2</option>
      <option>Option 3</option>
      <option>Option 4</option>
    </select>
    <div className="form-success">First name is valid</div>
  </div>
)
