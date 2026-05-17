import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postCandidate } from './api';

interface FormData {
  name: string;
  surname: string;
  email: string;
  phone: string;
  education: string;
  job_exp: string;
  resume: File | null;
}

function validate(data: FormData): string[] {
  const errors: string[] = [];
  if (!data.name.trim()) errors.push('name is required');
  if (!data.surname.trim()) errors.push('surname is required');
  if (!data.email.trim()) {
    errors.push('email is required');
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push('email has invalid format');
  }
  if (!data.phone.trim()) errors.push('phone is required');
  return errors;
}

function CandidateAddPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState<FormData>({
    name: '',
    surname: '',
    email: '',
    phone: '',
    education: '',
    job_exp: '',
    resume: null,
  });
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const setField = (field: keyof FormData, value: string | File | null) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setError(null);
    const errors = validate(form);
    if (errors.length > 0) {
      setError(errors.join('; '));
      return;
    }
    setSubmitting(true);
    try {
      const res = await postCandidate({
        name: form.name,
        surname: form.surname,
        email: form.email,
        phone: form.phone,
        education: form.education || undefined,
        job_exp: form.job_exp || undefined,
        resume: form.resume || undefined,
      });
      if (!res.ok) {
        const body = await res.json();
        setError(body.error || 'Failed to submit candidate');
        return;
      }
      navigate('/');
    } catch (err) {
      console.error('Submit error:', err);
      setError('Failed to connect to the server');
      console.error('Submit error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h2>Add a new candidate</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '300px' }}
        >
          <input
            placeholder="Name"
            value={form.name}
            onChange={(e) => setField('name', e.target.value)}
          />
          <input
            placeholder="Surname"
            value={form.surname}
            onChange={(e) => setField('surname', e.target.value)}
          />
          <input
            placeholder="Email"
            value={form.email}
            onChange={(e) => setField('email', e.target.value)}
          />
          <input
            placeholder="Phone"
            value={form.phone}
            onChange={(e) => setField('phone', e.target.value)}
          />
          <input
            placeholder="Education (optional)"
            value={form.education}
            onChange={(e) => setField('education', e.target.value)}
          />
          <input
            placeholder="Job experience (optional)"
            value={form.job_exp}
            onChange={(e) => setField('job_exp', e.target.value)}
          />
          <input
            type="file"
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            onChange={(e) => setField('resume', e.target.files?.[0] || null)}
          />
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
            <button type="button" onClick={() => navigate('/')}>
              Cancel
            </button>
            <button type="submit" disabled={submitting}>
              {submitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      </header>
    </div>
  );
}

export default CandidateAddPage;
