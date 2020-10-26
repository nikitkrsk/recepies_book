const dev={
    API_URL:"https://recepies.dev/api",
    DOMAIN: "Recepies"
}

const prod={
    API_URL:"https://yourProductionDomain.com/api",
    DOMAIN: "Recepies"
}
const config=process.env.NODE_ENV==='development'?dev:prod
export default  config
