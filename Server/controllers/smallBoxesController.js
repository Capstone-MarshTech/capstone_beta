import Claim from "../models/ClaimModel.js";
import { filterData } from './filterController.js';

export const allClaimsCount = async (req, res) => {
    const filters = req.query;
   
    try {
      
      const query = filterData(filters)

      const distinct_claims = await Claim.distinct("claim_number", {...query});
      const count = distinct_claims.length;
      res.json(count);
    } catch (error) {
      res.status(error.statusCode || 500).json({ message: error.message });
    }
  };
  
  export const totalIncurred = async (req, res) => {
    const filters = req.query;
    try { 
        
        const query = filterData(filters);
        const total_incurred_keyValue = await Claim.aggregate([
            {
                $match: {...query}
            },
            {
                $group: {
                    _id: null,
                    total_incurred: {$sum: "$total_net_incurred" } }
            },
            {
                $project: {
                    _id: 0,
                    total_incurred: 1
                }
            }
        ]);
        const total_incurred_value = total_incurred_keyValue[0].total_incurred;
        res.json(total_incurred_value);
    }catch (error){
        res.status(error.statusCode || 500).json({ message: error.message });

    }
};
  