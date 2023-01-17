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
  TypeOfWork: {
    Repair: "Repair",
    Maintenance: "Maintenance",
    Damaged: "Damaged",
    General: "General",
    Landscaping: "Landscaping",
    Pool: "Pool",
    Electrical: "Electrical",
    Plumbing: "Plumbing",
    Carpentry: "Carpentry",
    Cleaning: "Cleaning",
  },
  Location: {
    Lobby: "Lobby",
    Pool: "Pool",
    SeaSide: "SeaSide",
    Admin: "Admin",
    Restroom: "Restroom",
    Guest: "Guest",
    Staff: "Staff",
    Receiving: "Receiving",
    Reception: "Reception",
    Restaurant: "Restaurant",
  },
};

// Lock object to prevent modification (true static).
Object.freeze(Enums);

export default Enums;
