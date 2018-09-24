package com.textmessenger.utils;

import org.flywaydb.core.Flyway;

public class FlyAwayMigratingTool {
  public static void main(String[] args) {
    // Create the Flyway instance
    Flyway flyway = new Flyway();

    // Point it to the database
    flyway.setDataSource("jdbc:h2:mem:example-app;DB_CLOSE_DELAY=-1;DB_CLOSE_ON_EXIT=FALSE;MODE=MYSQL;", "sa", null);

    // Start the migration
    flyway.migrate();

  }
}
