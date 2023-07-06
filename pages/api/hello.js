// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  res.status(200).json({
    name: 'John Doe',
    message: 'hello world. welcome to next js api route'
  })
}
