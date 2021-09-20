using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class changedUserRoleKey : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "name",
                table: "EmployeeRoles");

            migrationBuilder.AddColumn<int>(
                name: "roleKey",
                table: "EmployeeRoles",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "roleKey",
                table: "EmployeeRoles");

            migrationBuilder.AddColumn<string>(
                name: "name",
                table: "EmployeeRoles",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
