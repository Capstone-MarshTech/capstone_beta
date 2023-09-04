import Claim from '../models/ClaimModel.js'
import { filterData } from './filterController.js';


export const largestClaimByLossBanding = async (req, res) => {
    const loss_band = req.query.loss_banding;
    const filters = req.query;
    try {
      const query = filterData(filters);
      const largest_claim_by_loss_banding_keyValue = await Claim.aggregate([
        {
          $match: { loss_banding: loss_band, ...query },
        },
        {
          $group: {
            _id: null,
            largest_claim: { $max: "$total_net_incurred" },
          },
        },
        {
          $project: {
            _id: 0,
            largest_claim: 1,
          },
        },
      ]);
      const largest_claim_by_loss_banding_value =
        largest_claim_by_loss_banding_keyValue[0].largest_claim;
      res.json(largest_claim_by_loss_banding_value);
    } catch (error) {
      res.status(error.statusCode || 500).json({ message: error.message });
    }
  };
  
  export const averageCostByLossBanding = async (req, res) => {
    const loss_band = req.query.loss_banding;
    const filters = req.query;

    try {
      const query = filterData(filters)
      const average_total_incurred_by_loss_banding_keyValue =
        await Claim.aggregate([
          {
            $match: { loss_banding: loss_band, ...query },
          },
          {
            $group: {
              _id: null,
              total_incurred_sum: { $sum: "$total_net_incurred" },
              count: { $sum: 1 },
            },
          },
          {
            $project: {
              _id: 0,
              average_total_incurred: {
                $divide: ["$total_incurred_sum", "$count"],
              },
            },
          },
        ]);
  
      if (average_total_incurred_by_loss_banding_keyValue.length > 0) {
        const average_total_incurred_by_loss_banding_value =
          average_total_incurred_by_loss_banding_keyValue[0]
            .average_total_incurred;
        res.json(average_total_incurred_by_loss_banding_value);
      } else {
        res.json(0);
      }
    } catch (error) {
      res.status(error.statusCode || 500).json({ message: error.message });
    }
  };