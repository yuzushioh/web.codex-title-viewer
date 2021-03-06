// TODO: Move to a common config location

const apiUrl = (() => {

  switch (process.env.TARGET_ENV) {
    case 'production':
      return 'https://codex-title-api.codexprotocol.com'

    case 'staging':
      return 'http://codex-title-api.codexprotocol-staging.com'

    default:
      return 'http://localhost:3001'
  }

})()

export default {
  apiUrl,
}
