/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images:{
    domains: ["localhost", "database-api", "api", "http://api"]
  },
  scripts:{
    domains: ["test.checkout.dibspayment.eu"]
  }
}
