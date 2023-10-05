package com.recipies.cookbook.controllers;

import com.recipies.cookbook.models.Recipe;
import com.recipies.cookbook.repository.RecipeRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/recipes")
public class RecipeController {

    private final RecipeRepository recipeRepository;

    public RecipeController(RecipeRepository recipeRepository) {
        this.recipeRepository = recipeRepository;
    }

    @GetMapping
    public List<Recipe> getRecipes() {
        return recipeRepository.findAll();
    }

    @GetMapping("/{id}")
    public Recipe getRecipe(@PathVariable Long id) {
      return recipeRepository.findById(id).orElseThrow(RuntimeException::new);
    }

    @PostMapping
    public ResponseEntity createRecipe(@RequestBody Recipe recipe) throws URISyntaxException {
        recipe.setCreatedAt(LocalDate.now());
        Recipe savedRecipe = recipeRepository.save(recipe);
        return ResponseEntity.created(new URI("/recipes/" + savedRecipe.getId())).body(savedRecipe);
    }

    @PutMapping("/{id}")
    public ResponseEntity updateRecipe(@PathVariable Long id, @RequestBody Recipe recipe) {
        Recipe current = recipeRepository.findById(id).orElseThrow(RuntimeException::new);
        current.setName(recipe.getName());
        current.setCategory(recipe.getCategory());
        current.setDescription(recipe.getDescription());
        current = recipeRepository.save(recipe);
        return ResponseEntity.ok(current);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteRecipe(@PathVariable Long id) {
        recipeRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }


}
