using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class renamedReservationLine : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ReservationLines");

            migrationBuilder.CreateTable(
                name: "ReservationRoomLines",
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
                    table.PrimaryKey("PK_ReservationRoomLines", x => x._id);
                    table.ForeignKey(
                        name: "FK_ReservationRoomLines_ReservationHeaders_reservationHeaderId",
                        column: x => x.reservationHeaderId,
                        principalTable: "ReservationHeaders",
                        principalColumn: "_id",
                        onDelete: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_ReservationRoomLines_Rooms_roomId",
                        column: x => x.roomId,
                        principalTable: "Rooms",
                        principalColumn: "_id",
                        onDelete: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_ReservationRoomLines_RoomVariants_roomVariantId",
                        column: x => x.roomVariantId,
                        principalTable: "RoomVariants",
                        principalColumn: "_id",
                        onDelete: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_ReservationRoomLines_Users_createdBy",
                        column: x => x.createdBy,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ReservationRoomLines_createdBy",
                table: "ReservationRoomLines",
                column: "createdBy");

            migrationBuilder.CreateIndex(
                name: "IX_ReservationRoomLines_reservationHeaderId",
                table: "ReservationRoomLines",
                column: "reservationHeaderId");

            migrationBuilder.CreateIndex(
                name: "IX_ReservationRoomLines_roomId",
                table: "ReservationRoomLines",
                column: "roomId");

            migrationBuilder.CreateIndex(
                name: "IX_ReservationRoomLines_roomVariantId",
                table: "ReservationRoomLines",
                column: "roomVariantId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ReservationRoomLines");

            migrationBuilder.CreateTable(
                name: "ReservationLines",
                columns: table => new
                {
                    _id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    createdDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    endDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    extraPaxCount = table.Column<int>(type: "int", nullable: false),
                    reservationHeaderId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    roomId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    roomVariantId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    startDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    createdBy = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ReservationLines", x => x._id);
                    table.ForeignKey(
                        name: "FK_ReservationLines_ReservationHeaders_reservationHeaderId",
                        column: x => x.reservationHeaderId,
                        principalTable: "ReservationHeaders",
                        principalColumn: "_id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ReservationLines_Rooms_roomId",
                        column: x => x.roomId,
                        principalTable: "Rooms",
                        principalColumn: "_id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ReservationLines_RoomVariants_roomVariantId",
                        column: x => x.roomVariantId,
                        principalTable: "RoomVariants",
                        principalColumn: "_id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ReservationLines_Users_createdBy",
                        column: x => x.createdBy,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
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
        }
    }
}
