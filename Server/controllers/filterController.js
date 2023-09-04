export const filterData = (filters) => {
    try {
        const query = {};

        if (filters.year) {
            query.cleansed_policyyear = parseInt(filters.year);
        }

        if (filters.line_of_business_1) {
            query.marsh_line_of_business_1 = filters.line_of_business_1;
        }

        if (filters.line_of_business_2) {
            query.marsh_line_of_business_2 = filters.line_of_business_2;
        }        
        
        if (filters.client) { 
            query.client_name = filters.client; 
        }
        
        console.log(query);
        
        return query;
        //const filteredData = await Claim.find(query).lean();
        //return filteredData;

    } catch (error) {
        throw error;
    }
};
