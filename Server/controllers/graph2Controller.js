import Claim from '../models/ClaimModel.js'
import { filterData } from './filterController.js';

export const totalOutstanding = async (req, res) => {

    const  filters = req.query;
    
        try { 
            const query = filterData(filters);
            const total_outstanding_keyValue = await Claim.aggregate([
                {
                    $match: { ...query  }
                },
                {
                    $group: {
                        _id: null,
                        total_outstanding: {$sum: "$total_net_os" } }
                },
                {
                    $project: {
                        _id: 0,
                        total_outstanding: 1
                    }
                }
            ]);
            const total_outstanding_value = total_outstanding_keyValue[0].total_outstanding;
            res.json(total_outstanding_value);
        }catch (error){
            res.status(error.statusCode || 500).json({ message: error.message });
    
        }
};

export const totalPaid = async (req, res) => {
    
    const  filters  = req.query;

    try { 

        const query = filterData(filters) 
        const total_net_paid_keyValue = await Claim.aggregate([
            {
                $match: { ...query }
            },
            {
                $group: {
                    _id: null,
                    total_net_paid: {$sum: "$total_net_paid" } }
            },
            {
                $project: {
                    _id: 0,
                    total_net_paid: 1
                }
            }

        ])
        const total_net_paid_value = total_net_paid_keyValue[0].total_net_paid;
        res.json(total_net_paid_value);
    }catch (error){
        res.status(error.statusCode || 500).json({ message: error.message });

    }
};
export const largestClaim = async (req, res) => {
    const  filters  = req.query;

    try { 
        const query = filterData(filters)
        const max_claim_keyValue = await Claim.aggregate([
            {
                $match: { ...query }
            },
            {
                $group: {
                    _id: null,
                    max_paid: {$max: "$total_net_incurred" } }
            },
            {
                $project: {
                    _id: 0,
                    max_paid: 1
                }
            }
        ]);
        const max_claim_value = max_claim_keyValue[0].max_paid;
        res.json(max_claim_value);
    }catch (error){
        res.status(error.statusCode || 500).json({ message: error.message });

    }
};