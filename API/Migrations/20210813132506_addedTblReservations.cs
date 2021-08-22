using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class addedTblReservations : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ReservationHeaders",
                columns: table => new
                {
                    _id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    customerId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    reservationTypeId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    createdBy = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    createdDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ReservationHeaders", x => x._id);
                    table.ForeignKey(
                        name: "FK_ReservationHeaders_Customers_customerId",
                        column: x => x.customerId,
                        principalTable: "Customers",
                        principalColumn: "_id",
                        onDelete: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_ReservationHeaders_ReservationTypes_reservationTypeId",
                        column: x => x.reservationTypeId,
                        principalTable: "ReservationTypes",
                        principalColumn: "_id",
                        onDelete: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_ReservationHeaders_Users_createdBy",
                        column: x => x.createdBy,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateTable(
                name: "ReservationPayments",
                columns: table => new
                {
                    _id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ReservationHeaderId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    type = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    amount = table.Column<float>(type: "real", nullable: false),
                    paymentId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    paymentRefNum = table.Column<int>(type: "int", nullable: false),
                    createdBy = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    createdDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ReservationPayments", x => x._id);
                    table.ForeignKey(
                        name: "FK_ReservationPayments_Payments_paymentId",
                        column: x => x.paymentId,
                        principalTable: "Payments",
                        principalColumn: "_id",
                        onDelete: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_ReservationPayments_ReservationHeaders_ReservationHeaderId",
                        column: x => x.ReservationHeaderId,
                        principalTable: "ReservationHeaders",
                        principalColumn: "_id",
                        onDelete: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_ReservationPayments_Users_createdBy",
                        column: x => x.createdBy,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ReservationHeaders_createdBy",
                table: "ReservationHeaders",
                column: "createdBy");

            migrationBuilder.CreateIndex(
                name: "IX_ReservationHeaders_customerId",
                table: "ReservationHeaders",
                column: "customerId");

            migrationBuilder.CreateIndex(
                name: "IX_ReservationHeaders_reservationTypeId",
                table: "ReservationHeaders",
                column: "reservationTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_ReservationPayments_createdBy",
                table: "ReservationPayments",
                column: "createdBy");

            migrationBuilder.CreateIndex(
                name: "IX_ReservationPayments_paymentId",
                table: "ReservationPayments",
                column: "paymentId");

            migrationBuilder.CreateIndex(
                name: "IX_ReservationPayments_ReservationHeaderId",
                table: "ReservationPayments",
                column: "ReservationHeaderId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ReservationPayments");

            migrationBuilder.DropTable(
                name: "ReservationHeaders");
        }
    }
}
