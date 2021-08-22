using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class addedReservationLine : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ReservationPayments_ReservationHeaders_ReservationHeaderId",
                table: "ReservationPayments");

            migrationBuilder.RenameColumn(
                name: "ReservationHeaderId",
                table: "ReservationPayments",
                newName: "reservationHeaderId");

            migrationBuilder.RenameIndex(
                name: "IX_ReservationPayments_ReservationHeaderId",
                table: "ReservationPayments",
                newName: "IX_ReservationPayments_reservationHeaderId");

            migrationBuilder.CreateTable(
                name: "ReservationLines",
                columns: table => new
                {
                    _id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    reservationHeaderId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    startDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    endDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    roomId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    roomVariantId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    extraPaxCount = table.Column<int>(type: "int", nullable: false),
                    createdBy = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    createdDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ReservationLines", x => x._id);
                    table.ForeignKey(
                        name: "FK_ReservationLines_ReservationHeaders_reservationHeaderId",
                        column: x => x.reservationHeaderId,
                        principalTable: "ReservationHeaders",
                        principalColumn: "_id",
                        onDelete: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_ReservationLines_Rooms_roomId",
                        column: x => x.roomId,
                        principalTable: "Rooms",
                        principalColumn: "_id",
                        onDelete: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_ReservationLines_RoomVariants_roomVariantId",
                        column: x => x.roomVariantId,
                        principalTable: "RoomVariants",
                        principalColumn: "_id",
                        onDelete: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_ReservationLines_Users_createdBy",
                        column: x => x.createdBy,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ReservationLines_createdBy",
                table: "ReservationLines",
                column: "createdBy");

            migrationBuilder.CreateIndex(
                name: "IX_ReservationLines_reservationHeaderId",
                table: "ReservationLines",
                column: "reservationHeaderId");

            migrationBuilder.CreateIndex(
                name: "IX_ReservationLines_roomId",
                table: "ReservationLines",
                column: "roomId");

            migrationBuilder.CreateIndex(
                name: "IX_ReservationLines_roomVariantId",
                table: "ReservationLines",
                column: "roomVariantId");

            migrationBuilder.AddForeignKey(
                name: "FK_ReservationPayments_ReservationHeaders_reservationHeaderId",
                table: "ReservationPayments",
                column: "reservationHeaderId",
                principalTable: "ReservationHeaders",
                principalColumn: "_id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ReservationPayments_ReservationHeaders_reservationHeaderId",
                table: "ReservationPayments");

            migrationBuilder.DropTable(
                name: "ReservationLines");

            migrationBuilder.RenameColumn(
                name: "reservationHeaderId",
                table: "ReservationPayments",
                newName: "ReservationHeaderId");

            migrationBuilder.RenameIndex(
                name: "IX_ReservationPayments_reservationHeaderId",
                table: "ReservationPayments",
                newName: "IX_ReservationPayments_ReservationHeaderId");

            migrationBuilder.AddForeignKey(
                name: "FK_ReservationPayments_ReservationHeaders_ReservationHeaderId",
                table: "ReservationPayments",
                column: "ReservationHeaderId",
                principalTable: "ReservationHeaders",
                principalColumn: "_id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
