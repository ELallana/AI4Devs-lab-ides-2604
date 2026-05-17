const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:3010';

export interface CandidateData {
  name: string;
  surname: string;
  email: string;
  phone: string;
  education?: string;
  job_exp?: string;
  resume?: File;
}

export async function postCandidate(data: CandidateData): Promise<Response> {
  const formData = new FormData();
  formData.append('name', data.name);
  formData.append('surname', data.surname);
  formData.append('email', data.email);
  formData.append('phone', data.phone);
  if (data.education) formData.append('education', data.education);
  if (data.job_exp) formData.append('job_exp', data.job_exp);
  if (data.resume) formData.append('resume', data.resume);

  const url = `${API_BASE}/candidates`;
  console.log('POSTing to', url);
  const res = await fetch(url, {
    method: 'POST',
    body: formData,
  });
  console.log('Response status:', res.status);
  return res;
}
