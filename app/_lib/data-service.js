import { notFound } from 'next/navigation';
import { supabase } from './supabase';
import { unstable_noStore as noStore } from 'next/cache';
import { eachDayOfInterval } from 'date-fns';

export async function getCabin(id) {

  const { data, error } = await supabase
    .from('cabins')
    .select('*')
    .eq('id', id)
    .single();
  if (error) {
    console.error(error);
    notFound();
  }

  return data;
}

export async function getCabins() {
  noStore();
  const { data, error } = await supabase
    .from('cabins')
    .select('id, name, maxCapacity, regularPrice, discount, image')
    .order('name');

  if (error) {
    console.error(error);
    throw new Error('Cabins could not be loaded');
  }

  return data;
}

// lib/getCountries.js
export async function getCountries() {
  const url = 'https://restcountries.com/v3.1/all';

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch countries');
    }
    const countries = await response.json();
    return countries.map((country) => ({
      name: country.name.common,
      code: country.cca2,
    }));
  } catch (error) {
    console.error('Error fetching countries:', error);
    return [];
  }
}

export async function getBookedDatesByCabinId(cabinId) {
  let today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  today = today.toISOString();

  //Getting all bookings

  const {data, error} = await supabase
  .from("bookings")
  .select("*")
  .eq("cabinID",cabinId)
  .or(`startDate.gte.${today},status.eq.checked-in`);

  if (error) {
    console.error(error);
    throw new Error('Bookings could not be loaded');
  }

  //converting days to be displayed it

  const bookedDates = data.map((booking) => {
    return eachDayOfInterval({
      start: new Date(booking.startDate),
      end: new Date(booking.endDate)
    })
  }).flat();

  return bookedDates;

}

export async function getSettings() {

  const{data,error} = await supabase.from('settings').select('*').single();

  if (error) {
    console.error(error);
    throw new Error('Settings could not be loaded');
  }

  return data;
}

export async function getGuest(email) {
   
  const {data, error} = await supabase.from("guests").select("*").eq("email",email).single();
  
  return data;

}

export async function createGuest(newGuest) {

  const {data, error} = await supabase.from("guests").insert([newGuest]);

  if (error) {
    console.error(error);
    throw new Error('Guest could not be created');
  }

  return data;
  
}

export async function getBookings(guestId) {

  const {data, error, count} = await supabase.from("bookings").select("*").eq("guestId",guestId).order("startDate");

  if (error) {
    console.error(error);
    throw new Error('bookings could not be loaded');
  }

  return data;
  
}