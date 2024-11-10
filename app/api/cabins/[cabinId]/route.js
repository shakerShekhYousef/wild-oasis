import { getBookedDatesByCabinId, getCabin } from "@/app/_lib/data-service";

export async function GET(request, { params }) {
    try {
        const { cabinId } = params;

        const [cabins, bookedDates] = await Promise.all([
            getCabin(cabinId),
            getBookedDatesByCabinId(cabinId)
        ]);

        return Response.json({ cabin: cabins, booked_dates: bookedDates });

    } catch {
        return Response.json({ message: "Cabin not found" });

    }
}