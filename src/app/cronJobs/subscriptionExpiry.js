import cron from "node-cron";
import dbconnect from "../lib/dbConnect";
import User from "../models/User";

// Run every day at midnight
cron.schedule("0 0 * * *", async () => {
  try {
    await dbconnect();

    const now = new Date();
    // Users with subscriptionExpiry older than or equal to now will be reset.
    const result = await User.updateMany(
      { subscribe: true, subscriptionExpiry: { $lte: now } },
      { subscribe: false, subscriptionExpiry: null }
    );

    console.log(
      `Subscription expiry job: Updated ${
        result.modifiedCount || result.nModified
      } user(s)`
    );
  } catch (error) {
    console.error("Error in subscription expiry job:", error);
  }
});
