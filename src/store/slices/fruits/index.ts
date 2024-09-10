import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { supabase } from "@/supabase/supabaseClient";

const fruitsApi = createApi({
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    getFruits: builder.query({
      queryFn: async () => {
        const { data, error } = await supabase.from("fruits").select("*");
        if (error) {
          throw { error };
        }

        return { data };
      },
    }),
  }),
});

export const { useGetFruitsQuery } = fruitsApi;
export { fruitsApi };
