import c from "crypto-js"
import fetch from "node-fetch"

const crypto = await import('node:crypto')

var a = c.enc.Utf8.parse("e5b40d297czfca34")
, o = c.enc.Utf8.parse("Dan-tsa-rnG-Edgm")
, r = {
  iv: a,
  mode: c.mode.CBC,
  padding: c.pad.Pkcs7
}
, u = [102, 102, 70, 83, 101, 97, 54, 82, 111, 110, 71, 54, 69, 71, 67, 112, 78, 75, 105, 90, 54, 101, 111, 47, 99, 90, 71, 83, 67, 116, 117, 90, 76, 85, 117, 50, 65, 52, 81, 86, 118, 84, 81, 61]
, i = [68, 102, 68, 54, 81, 110, 83, 90, 88, 111, 108, 84, 69, 79, 77, 75, 82, 101, 99, 109, 84, 73, 48, 82, 86, 53, 113, 54, 54, 81, 107, 112, 73, 70, 105, 107, 72, 88, 109, 70, 82, 83, 99, 61]
, s = c.enc.Utf8.parse(p(l(u), o, r))
, f = c.enc.Utf8.parse(p(l(i), o, r))
, d = {
  iv: f,
  mode: c.mode.CBC,
  padding: c.pad.Pkcs7
}

function m(n, t, e) {
  if (!n)
      return "";
  t = t || s,
  e = e || d,
  n = n.toString();
  var a = c.AES.encrypt(n, t, e);
  return a.toString()
}

function l(n) {
  if (Array.isArray(n))
    return n.reduce((function(n, t) {
      return n + String.fromCharCode(t)
    }
    ), "")
}

function p(n, t, e) {
  if (!n)
    return "";
  t = t || s,
  e = e || d;
  var a = c.AES.decrypt(n, t, e);
  return a.toString(c.enc.Utf8)
}

function genPayload(phoneNo) {
  const nonce = crypto.randomUUID()
  const req = {
    phoneNo: m(phoneNo),
    type: "0",
    nonce,
    encryptNonce: m(nonce),
    timestamp: Date.now()
  }
  return JSON.stringify(req)
}

async function sendSMSCode(phoneNo) {
  const payload = genPayload(phoneNo)
  console.log(payload)
  const body = new URLSearchParams()
  body.append("req", payload)
  const res = await (await fetch("https://5gsign.cmccsim.com/api/portal/login/sendVerificationCode.do", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body
  })).json()
  console.log(res)
}

const phoneNo = "13000000000" //这里改成你的真实电话号码
await sendSMSCode(phoneNo)