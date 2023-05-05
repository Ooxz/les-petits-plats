import { normalize } from './normalize.js'

export const filters = {
  mainSearch: '',
  ingredients: [],
  appliances: '',
  ustensils: []
}

export function filter (recipes, filters) {
  let filtredRecipes = [...recipes]
  if (filters.ingredients.length > 0) {
    filtredRecipes = [...filterIngredients(filtredRecipes, filters.ingredients)]
  }
  if (filters.appliances.length > 0) {
    filtredRecipes = [...filterAppliance(filtredRecipes, filters.appliances)]
  }
  if (filters.ustensils.length > 0) {
    filtredRecipes = [...filterUstensils(filtredRecipes, filters.ustensils)]
  }
  if (filters.mainSearch.length > 2) {
    filtredRecipes = [...filterMainSearch(filtredRecipes, filters.mainSearch)]
  }
  return filtredRecipes
}
function filterIngredients (recipes, ingredients) {
  let filtredRecipes = [...recipes]
  ingredients.forEach(ingredient => {
    const newFilter = []
    filtredRecipes.forEach(recipe => {
      const index = recipe.ingredients.findIndex(elt => elt.ingredient.toLowerCase() === ingredient.toLowerCase())
      if (index > -1) {
        newFilter.push(recipe)
      }
    })
    filtredRecipes = [...newFilter]
  })
  return [...new Set(filtredRecipes)]
}

function filterAppliance (recipes, appliance) {
  let filtredRecipes = [...recipes]
  const newFilter = []
  filtredRecipes.forEach(recipe => {
    const isAppliance = recipe.appliance.toLowerCase() === appliance.toLowerCase()
    if (isAppliance) {
      newFilter.push(recipe)
    }
    filtredRecipes = [...newFilter]
  })
  return [...new Set(filtredRecipes)]
}

function filterUstensils (recipes, ustensils) {
  let filtredRecipes = [...recipes]
  ustensils.forEach(ustensil => {
    const newFilter = []
    filtredRecipes.forEach(recipe => {
      const index = recipe.ustensils.findIndex(elt => elt.toLowerCase() === ustensil.toLowerCase())
      if (index > -1) {
        newFilter.push(recipe)
      }
    })
    filtredRecipes = [...newFilter]
  })
  return [...new Set(filtredRecipes)]
}

function filterMainSearch (recipes, searchedExpression) {
  const filtredRecipes = []
  recipes.forEach(recipe => {
    if (normalize(recipe.name).includes(searchedExpression) ||
     normalize(recipe.description).includes(searchedExpression) ||
     hasIngredient(recipe, searchedExpression) ||
     hasAppliance(recipe, searchedExpression) ||
     hasUstensils(recipe, searchedExpression)) {
      filtredRecipes.push(recipe)
    }
  })
  return [...new Set(filtredRecipes)]
}

function hasIngredient (recipe, search) {
  const index = recipe.ingredients.findIndex(elt => normalize(elt.ingredient).includes(search))
  return index >= 0
}

function hasAppliance (recipe, search) {
  const index = normalize(recipe.appliance).includes(search)
  return index
}

function hasUstensils (recipe, search) {
  const index = recipe.ustensils.findIndex(elt => normalize(elt).includes(search))
  return index >= 0
}
