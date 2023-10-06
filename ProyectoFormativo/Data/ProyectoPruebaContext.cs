using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using ProyectoFormativo.Modelos.AuthenticationM;
using ProyectoFormativo.Modelos.InstructorM;
using ProyectoFormativo.Modelos.PDFM;
using ProyectoFormativo.Modelos.TrainingProgramM;

namespace ProyectoFormativo.Data;

public partial class ProyectoPruebaContext : DbContext
{
    public ProyectoPruebaContext()
    {
    }

    public ProyectoPruebaContext(DbContextOptions<ProyectoPruebaContext> options)
        : base(options)
    {
    }

    public virtual DbSet<ContractInstructor> ContractInstructors { get; set; }

    public virtual DbSet<FullTimeInstructor> FullTimeInstructors { get; set; }

    public virtual DbSet<Network> Networks { get; set; }
    public virtual DbSet<TrainingProgram> Programs { get; set; }

    public DbSet<User> Users { get; set; }
    public virtual DbSet<ArchivoPDF> ArchivosPDF { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<ContractInstructor>(entity =>
        {
            entity.HasKey(e => e.IdInstructor).HasName("PK__Contract__108500442604B571");

            entity.ToTable("ContractInstructor");

            entity.Property(e => e.EndDate)
                .HasColumnType("datetime")
                .HasColumnName("endDate");
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("name");
            entity.Property(e => e.NetworkId).HasColumnName("networkId");
            entity.Property(e => e.StartDate)
                .HasColumnType("datetime")
                .HasColumnName("startDate");

            entity.HasOne(d => d.oNetwork).WithMany(p => p.ContractInstructors)
                .HasForeignKey(d => d.NetworkId)
                .HasConstraintName("FK_IDNETWORK2");
        });

        modelBuilder.Entity<FullTimeInstructor>(entity =>
        {
            entity.HasKey(e => e.IdInstructor).HasName("PK__FullTime__1085004405BCE907");

            entity.ToTable("FullTimeInstructor");

            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("name");
            entity.Property(e => e.NetworkId).HasColumnName("networkId");
            entity.Property(e => e.Position)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("position");

            entity.HasOne(d => d.oNetwork).WithMany(p => p.FullTimeInstructors)
                .HasForeignKey(d => d.NetworkId)
                .HasConstraintName("FK_IDNETWORK");
        });

        modelBuilder.Entity<Network>(entity =>
        {
            entity.HasKey(e => e.IdNetwork).HasName("PK__Network__E3C7D2AC51A5E3F4");

            entity.ToTable("Network");

            entity.Property(e => e.NetworkName)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("networkName");
        });

        modelBuilder.Entity<TrainingProgram>(entity =>
        {
            entity.ToTable("Programs");

            entity.HasKey(e => e.Id);

            entity.Property(e => e.Id)
                .HasColumnName("Id");

            entity.Property(e => e.Level)
                .HasMaxLength(255)
                .HasColumnName("level");

            entity.Property(e => e.Mode)
                .HasMaxLength(255)
                .HasColumnName("mode");

            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .HasColumnName("name");

            entity.Property(e => e.ValidUntil)
                .HasMaxLength(255)
                .HasColumnName("validUntil");

            entity.Property(e => e.SniesCode)
                .HasColumnName("sniesCode");

            entity.Property(e => e.ResolutionNumber)
                .HasColumnName("resolutionNumber");

            entity.Property(e => e.ResolutionDate)
                .HasColumnType("date")
                .HasColumnName("resolutionDate");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Username).HasName("PK_User_Username");

            entity.ToTable("Users");

            entity.Property(e => e.Username)
                .HasMaxLength(30)
                .HasColumnName("Username");

            entity.Property(e => e.PasswordHash)
                .IsRequired()
                .HasColumnName("PasswordHash");

            entity.Property(e => e.PasswordSalt)
                .IsRequired()
                .HasColumnName("PasswordSalt");

            entity.Property(e => e.Mail)
                .HasMaxLength(30)
                .HasColumnName("Mail");

            entity.Property(e => e.Role)
                .HasMaxLength(20)
                .HasColumnName("Role");
        });

        modelBuilder.Entity<ArchivoPDF>(entity =>
        {
            entity.ToTable("ArchivosPDF"); // Nombre de la tabla en la base de datos

            entity.Property(e => e.ID).HasColumnName("ID"); // Nombre de la columna de ID
            entity.Property(e => e.NombreArchivo).HasColumnName("NombreArchivo");
            entity.Property(e => e.PDFData).HasColumnName("PDFData");
        });

       

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
