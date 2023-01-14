const Enums = {
  ApprovalStatus: {
    Pending: "Pending",
    Rejected: "Rejected",
    Approved: "Approved",
    Cancelled: "Cancelled",
    Action: "Action",
    All: "All",
  },
  ReceivedStatus: {
    Unreceived: "Unreceived",
    Received: "Received",
    Partial: "Partial",
    All: "All",
  },
  AdjustmentAction: {
    Decrease: "Decrease",
    Increase: "Increase",
  },
  InventoryLocation: {
    Main: "Main",
    Production: "Production",
  },
  InventoryAdjustmentType: {
    Audit: "Audit",
    Breakage: "Breakage",
    Damaged: "Damaged",
    Discrepancy: "Discrepancy",
    Error: "Error",
    Spoilage: "Spoilage",
    Stocktake: "Stocktake",
    Return: "Return",
    Theft: "Theft",
    Waste: "Waste",
  },
};

// Lock object to prevent modification (true static).
Object.freeze(Enums);

export default Enums;
