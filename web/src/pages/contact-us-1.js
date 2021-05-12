import CenteredForm from '../layouts/centered-form'
import ContactUs from '../components/sample-forms/contact-us'

const Index = () => {
  return (
    <CenteredForm
      title="Contact us"
      subtitle="Send us a message and we'll get back to you as soon as possible">
      <ContactUs message="Thanks for your message. We'll get back to you as soon as possible" />
    </CenteredForm>
  )
}

export default Index
