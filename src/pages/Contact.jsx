import { ContactForm } from '../components/ContactForm.jsx';

export function Contact() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="mb-6 text-2xl font-semibold">联系我</h1>
      <ContactForm />
    </main>
  );
}
