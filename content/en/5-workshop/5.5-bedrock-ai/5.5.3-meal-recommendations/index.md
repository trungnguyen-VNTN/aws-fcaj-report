---
title: "Meal recommendations (Bonus)"
pre: "5.5.3."
weight: 3
status: "ready"
---

Verify profiles and DB-derived meal suggestions.

1. **Review the source configuration**

D32 adds profiles and meal suggestions. Backend identity comes from JWT sub. GET/PUT/DELETE /api/me/profile handles profile data and consent, GET /api/me/targets calculates targets, and GET /api/me/recommendations suggests a meal. Code applies Mifflin-St Jeor multiplied by activity level. Goals adjust energy by −15%, no change, or +10%, with resting energy as a floor. Ages outside 18–65, BMI outside 17–35, pregnancy/breastfeeding, or medically supervised conditions are ineligible for personal targets.

[`backend/src/main/java/com/nutrition/profile/RecommendationService.java`](https://github.com/trungnguyen-VNTN/nutrition-ecommerce/blob/master/backend/src/main/java/com/nutrition/profile/RecommendationService.java)

```java
public class RecommendationService {
  /** Share of the day's targets each meal aims for. */
  public enum Meal {
    BREAKFAST(0.25),
    LUNCH(0.375),
    DINNER(0.375);
```

:::figure{src="/images/workshop/5.5.3-meal-recommendations-step1.png" alt="5.5.3-meal-recommendations-step1" caption="Profile-based lunch suggestion: numbers computed from the database against the meal target"}

2. **Verify the result**

Use synthetic profile data and consent. Check edit/deletion, ineligible cases, and suggestions combining protein, vegetables/fruit, and starch. Products must be in stock with complete data and fail-closed allergen filtering. Gram amounts are rounded to 10 and numbers recalculated from DB data. The plan intent invokes the same recommendation service; the model selects a meal and allergens without receiving body measurements. Automated tests passed on 21 November 2026; the signed-in live test record is below.

**Live test record (25 November 2026, customer account, dev environment on AWS):**

| Step | Action | Result |
| --- | --- | --- |
| 1 | `/profile`: enter birth year, sex, height, weight, activity level, goal Gain muscle; tick consent and save | Target **2,700 kcal/day**: protein 96 g, carbohydrate 377 g, fat 90 g. Resting energy 1,590 kcal, BMI 20. The page shows the "not medical advice" notice |
| 2 | `/suggestions` → Lunch | Meal target 1,013 kcal · 36 g protein. Suggested: canned tuna in water 130 g – 111.8 kcal, 25.2 g protein; kale 150 g – 52.5 kcal, 4.4 g protein; chickpeas 200 g – 756 kcal, 41 g protein. Total **920.3 kcal (91% of target)**, protein 70.6 g (196%) |
| 3 | Ask the AI assistant: "Suggest a lunch for me" | The AI returned **the same three items, grams, and figures** as the Suggestions page, total 920.3 kcal (91%), with the note that figures come from store data and the user's profile and are not medical advice |
| 4 | Ineligible cases (pregnancy/breastfeeding, supervised medical condition, age or BMI out of range) | Covered by the automated `NutritionTargetsTest`: the system returns the ineligibility reason and computes no personal targets. On the form, the supervised-condition checkbox states that the user will be referred to a professional |

Step 3 shows the model does not compute numbers itself: the `plan` intent calls the same recommender as the web page, and every figure comes from PostgreSQL and the user's profile.

#### Recorded troubleshooting

No errors occurred during the test. One improvement was noted: the recommender prioritises energy, so protein can far exceed the meal target (196% in this test) when a protein-rich starch such as chickpeas is chosen; a protein cap could be added in a later version.
