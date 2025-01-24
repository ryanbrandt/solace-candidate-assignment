import { relations, sql } from "drizzle-orm";
import {
  pgTable,
  integer,
  text,
  serial,
  timestamp,
  bigint,
  unique,
  primaryKey,
} from "drizzle-orm/pg-core";
import { pgEnumTable } from "./utilities";

export const city = pgTable(
  "city",
  {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    state: text("state").notNull(),
  },
  (t) => ({
    stateNameUniqueIndex: unique().on(t.name, t.state),
  })
);

export const degree = pgEnumTable("degree");

export const specialty = pgEnumTable("specialty");

export const advocate = pgTable("advocate", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  yearsOfExperience: integer("years_of_experience").notNull(),
  phoneNumber: bigint("phone_number", { mode: "number" }).notNull(),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
});

export const advocateCity = pgTable(
  "advocate_city",
  {
    advocateId: integer("advocate_id")
      .notNull()
      .references(() => advocate.id),
    cityId: integer("city_id")
      .notNull()
      .references(() => city.id),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.advocateId, t.cityId] }),
  })
);

export const advocateSpecialty = pgTable(
  "advocate_specialty",
  {
    advocateId: integer("advocate_id")
      .notNull()
      .references(() => advocate.id),
    specialtyId: integer("specialty_id")
      .notNull()
      .references(() => specialty.id),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.advocateId, t.specialtyId] }),
  })
);

export const advocateDegree = pgTable(
  "advocate_degree",
  {
    advocateId: integer("advocate_id")
      .notNull()
      .references(() => advocate.id),
    degreeId: integer("degree_id")
      .notNull()
      .references(() => degree.id),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.advocateId, t.degreeId] }),
  })
);

export const advocateRelations = relations(advocate, ({ many }) => ({
  degrees: many(advocateDegree),
  specialties: many(advocateSpecialty),
  cities: many(advocateCity),
}));

export const cityRelations = relations(city, ({ many }) => ({
  advocateCities: many(advocateCity),
}));

export const specialtyRelations = relations(specialty, ({ many }) => ({
  advocateSpecialties: many(advocateSpecialty),
}));

export const degreeRelations = relations(degree, ({ many }) => ({
  advocates: many(advocate),
}));

export const advocateCityRelations = relations(advocateCity, ({ one }) => ({
  advocate: one(advocate, {
    fields: [advocateCity.advocateId],
    references: [advocate.id],
  }),
  city: one(city, {
    fields: [advocateCity.cityId],
    references: [city.id],
  }),
}));

export const advocateSpecialtyRelations = relations(
  advocateSpecialty,
  ({ one }) => ({
    advocate: one(advocate, {
      fields: [advocateSpecialty.advocateId],
      references: [advocate.id],
    }),
    specialty: one(specialty, {
      fields: [advocateSpecialty.specialtyId],
      references: [specialty.id],
    }),
  })
);

export const advocateDegreeRelations = relations(advocateDegree, ({ one }) => ({
  advocate: one(advocate, {
    fields: [advocateDegree.advocateId],
    references: [advocate.id],
  }),
  degree: one(degree, {
    fields: [advocateDegree.degreeId],
    references: [degree.id],
  }),
}));
