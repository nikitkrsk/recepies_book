const dev={
    API_URL:"https://recepies.dev/api"
}

const prod={
    API_URL:"https://yourProductionDomain.com/api"
}
const config=process.env.NODE_ENV==='development'?dev:prod
export default  config
