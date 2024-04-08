const accessToken = `Bearer ${Cypress.env('gitlab_access_token')}`


Cypress.Commands.add('api_createLabel', (label, project) => {
    cy.api_createProject(project)
      .then(response => {
         cy.request({
             method: 'POST',
             url: `http://localhost/api/v4/projects/${response.body.id}/labels`,
             body: {
             name: label.name,
             color: label.color,
            },
            headers: { Authorization: accessToken },
        })
    })
})



Cypress.Commands.add('api_createIssue', (issue, project) => {
    cy.api_createProject(project)
      .then(response => {
         cy.request({
             method: 'POST',
             url: `http://localhost/api/v4/projects/${response.body.id}/issues`,
             body: {
             title: issue.title,
             description: issue.description,
            },
            headers: { Authorization: accessToken },
        })
    })
})


Cypress.Commands.add('api_createProject', project => {
  cy.request({
    method: 'POST',
    url: `http://localhost/api/v4/projects/`,
    body: {
      name: project.name,
      description: project.description,
      initialize_with_readme: true
    },
    headers: { Authorization: accessToken },
  })
})



Cypress.Commands.add('api_getAllProjects', () => {
    cy.request({
      method: 'GET',
      url: 'http://localhost/api/v4/projects/',
      headers: { Authorization: accessToken },
    })
  })
  

  
  Cypress.Commands.add('api_deleteProjects', () => {
    cy.api_getAllProjects().then(res =>
      res.body.forEach(project => cy.request({
        method: 'DELETE',
        url: `http://localhost/api/v4/projects/${project.id}`,
        headers: { Authorization: accessToken },
      }))
    )
  })