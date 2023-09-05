import Claim from '../models/ClaimModel.js';
import { filterData } from './filterController.js';

export const totalIncurredByLossBanding = async (req, res) => {
    const loss_band = req.query.loss_banding;
    const filters  = req.query;

    try {
        const query = filterData(filters);
        const aggregationPipeline = [
            {
                $match: { loss_banding: loss_band, ...query },
            },
            {
                $group: {
                    _id: null,
                    total_incurred: { $sum: "$total_net_incurred" },
                },
            },
            {
                $project: {
                    _id: 0,
                    total_incurred: 1,
                },
            },
        ];

        const total_incurred_keyValue = await Claim.aggregate(aggregationPipeline);
        const total_incurred_value = total_incurred_keyValue[0].total_incurred;

        res.json(total_incurred_value);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
};

    export const numberOfClaimsByLossBanding = async (req, res) => {
      const loss_band = req.query.loss_banding;
      const filters = req.query;

      try {
        const query = filterData(filters);
        const distinct_loss_banding_values = await Claim.distinct("claim_number", {
          loss_banding: loss_band, ...query
        });
        const count = distinct_loss_banding_values.length;
        res.json(count);
      } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
      }
    };