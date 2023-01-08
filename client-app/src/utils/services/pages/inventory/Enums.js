const Enums = {
  ApprovalStatus: {
    Pending: "Pending",
    Rejected: "Rejected",
    Approved: "Approved",
    Action: "Action",
    All: "All",
  },
};

// Lock object to prevent modification (true static).
Object.freeze(Enums);

export default Enums;
