const express = require('express')
const fs = require('fs')
const path = require('path')
const app = express()

app.use(express.json())

// At the top of index.js
const projectsAfrica = require('./data/projects-africa.json')
const projectsIndia = require('./data/projects-india.json')
const projectsLatam = require('./data/projects-latam.json')
const projectsSea = require('./data/projects-sea.json')
const winnersAfrica = require('./data/winners-africa.json')
const winnersIndia = require('./data/winners-india.json')
const winnersLatam = require('./data/winners-latam.json')
const winnersSea = require('./data/winners-sea.json')

// Replace the data object initialization
const data = {
  projects: {
    africa: projectsAfrica,
    india: projectsIndia,
    latam: projectsLatam,
    sea: projectsSea
  },
  winners: {
    africa: winnersAfrica,
    india: winnersIndia,
    latam: winnersLatam,
    sea: winnersSea
  }
}

// Add this after line 32
console.log('Loaded projects:', Object.keys(data.projects))
console.log('India projects count:', data.projects.india.length)

// Base route
app.get('/', (req, res) => {
  res.send(`
    <h1>Welcome to the Base Around The World Buildathon API!</h1>
    <h2>Available Endpoints:</h2>
    <ul>
      <li><code>GET /api/projects</code> - Get all projects from all regions</li>
      <li><code>GET /api/projects/:region</code> - Get projects from a specific region
        <ul>
          <li>africa</li>
          <li>india</li>
          <li>latam</li>
          <li>sea</li>
        </ul>
      </li>
      <li><code>GET /api/winners</code> - Get all winners from all regions</li>
      <li><code>GET /api/winners/:region</code> - Get winners from a specific region
        <ul>
          <li>africa</li>
          <li>india</li>
          <li>latam</li>
          <li>sea</li>
        </ul>
      </li>
    </ul>
    <p>Example: <a href="/api/projects/india">/api/projects/india</a></p>
    <style>
      body { font-family: Arial, sans-serif; margin: 40px; }
      code { background: #f0f0f0; padding: 2px 6px; border-radius: 4px; }
      ul { line-height: 1.6; }
    </style>
  `)
})

// Routes for projects
app.get('/api/projects/:region', (req, res) => {
  const region = req.params.region.toLowerCase()
  console.log('Requested region:', region)
  console.log('Available regions:', Object.keys(data.projects))
  if (data.projects[region]) {
    console.log('Found projects:', data.projects[region].length)
    res.setHeader('Content-Type', 'application/json')
    res.send(JSON.stringify(data.projects[region], null, 2))
  } else {
    console.log('Region not found:', region)
    res.status(404).json({ error: 'Region not found' })
  }
})

// Routes for winners
app.get('/api/winners/:region', (req, res) => {
  const region = req.params.region.toLowerCase()
  if (data.winners[region]) {
    res.json(data.winners[region])
  } else {
    res.status(404).json({ error: 'Region not found' })
  }
})

// Get all projects
app.get('/api/projects', (req, res) => {
  const allProjects = {
    africa: data.projects.africa,
    india: data.projects.india,
    latam: data.projects.latam,
    sea: data.projects.sea
  }
  res.json(allProjects)
})

// Get all winners
app.get('/api/winners', (req, res) => {
  const allWinners = {
    africa: data.winners.africa,
    india: data.winners.india,
    latam: data.winners.latam,
    sea: data.winners.sea
  }
  res.json(allWinners)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})