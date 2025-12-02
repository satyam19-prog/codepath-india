import axios from "axios";

const JUDGE0_URL = process.env.JUDGE0_URL;
const JUDGE0_KEY = process.env.JUDGE0_KEY;

function buildHeaders() {
  const headers = {};
  if (JUDGE0_KEY && JUDGE0_KEY.trim() !== "") {
    headers["x-rapidapi-key"] = JUDGE0_KEY;
    headers["x-rapidapi-host"] = "judge0-ce.p.rapidapi.com";
  }
  return headers;
}

export async function submitToJudge0(source_code, language_id, input = "") {
  const url = `${JUDGE0_URL}/submissions?base64_encoded=false&wait=false`;

  const payload = {
    source_code,
    language_id,
    stdin: input
  };

  const res = await axios.post(url, payload, {
    headers: buildHeaders(),
    timeout: 30000
  });

  return res.data.token;
}

export async function getJudge0Result(token) {
  const url = `${JUDGE0_URL}/submissions/${token}?base64_encoded=false`;
  const res = await axios.get(url, { headers: buildHeaders(), timeout: 30000 });
  return res.data;
}
