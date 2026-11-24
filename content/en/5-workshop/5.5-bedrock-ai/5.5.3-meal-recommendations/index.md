---
title: "Meal recommendations (Bonus)"
pre: "5.5.3."
weight: 3
status: "draft"
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

Use synthetic profile data and consent. Check edit/deletion, ineligible cases, and suggestions combining protein, vegetables/fruit, and starch. Products must be in stock with complete data and fail-closed allergen filtering. Gram amounts are rounded to 10 and numbers recalculated from DB data. The plan intent invokes the same recommendation service; the model selects a meal and allergens without receiving body measurements. PROGRESS on 21 November 2026 records passing automated tests but leaves signed-in live testing open.

:::todo[Actual results — profiles]
Attach the signed-in live test record for /profile, /suggestions, and AI meal suggestions.
:::

#### Recorded troubleshooting

A profile-specific failure record is not available.
