package com.recipies.cookbook.repository;

import com.recipies.cookbook.models.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RecipeRepository extends JpaRepository<Recipe, Long> {
}
