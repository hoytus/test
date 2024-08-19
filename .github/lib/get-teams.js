module.exports = async function getTeams(context, github, userLogins) {
  const query = `
    query UsersTeamsInOrg($org: String!, $userLogins: [String!]!) {
      organization(login: $org) {
        teams(first: 100, userLogins: $userLogins) {
          nodes {
            name
          }
        }
      }
    }
  `
  const variables = {
    org: context.repo.owner,
    userLogins,
  }
  const result = await github.graphql(query, variables)
  return result?.organization?.teams?.nodes?.map(node => `@${context.repo.owner}/${node.name}`) || []
}
