const Enums = {
  ApprovalStatus: {
    Pending: "Pending",
    Rejected: "Rejected",
    Approved: "Approved",
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
};

// Lock object to prevent modification (true static).
Object.freeze(Enums);

export default Enums;
