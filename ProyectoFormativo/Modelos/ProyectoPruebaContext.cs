using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace ProyectoFormativo.Modelos;

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

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
