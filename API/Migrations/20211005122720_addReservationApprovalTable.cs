using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class addReservationApprovalTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ReservationApprovals",
                columns: table => new
                {
                    _id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    transId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    approvalType = table.Column<int>(type: "int", nullable: false),
                    action = table.Column<int>(type: "int", nullable: false),
                    status = table.Column<int>(type: "int", nullable: false),
                    requestedById = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    requestedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    approvedById = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    approvedDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ReservationApprovals", x => x._id);
                    table.ForeignKey(
                        name: "FK_ReservationApprovals_Users_approvedById",
                        column: x => x.approvedById,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ReservationApprovals_Users_requestedById",
                        column: x => x.requestedById,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ReservationApprovals_approvedById",
                table: "ReservationApprovals",
                column: "approvedById");

            migrationBuilder.CreateIndex(
                name: "IX_ReservationApprovals_requestedById",
                table: "ReservationApprovals",
                column: "requestedById");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ReservationApprovals");
        }
    }
}
