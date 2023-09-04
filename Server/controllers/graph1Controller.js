import Claim from '../models/ClaimModel.js'
import { filterData } from '../controllers/filterController.js'

export const closedCount = async (req, res) => {
  
  const filters = req.query;
  
    try { 
        const query = filterData(filters)
        const closed_claims_count = await Claim.countDocuments({ 
          closed_claim: true, 
          ...query }); 
        res.json(closed_claims_count);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }

};
export const openCount = async (req, res) => {
    
  const filters = req.query;
  
    try {
      
      const query = filterData(filters);
      const open_claims_count = await Claim.countDocuments({
        open_claim: true,
        ...query,
      });
      res.json(open_claims_count);
    } catch (error) {
      res.status(error.statusCode || 500).json({ message: error.message });
    }
  };
  
  export const zeroValueCount = async (req, res) => {
  
    const filters = req.query;

   try {
      
      const query = filterData(filters);
      const zero_value_claim_count = await Claim.countDocuments({
        zero_value_claim: true, 
        ...query,
      });
      
      res.json(zero_value_claim_count);
    } catch (error) {
      res.status(error.statusCode || 500).json({ message: error.message });
    }
  };
  