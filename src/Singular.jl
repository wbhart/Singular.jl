module Singular

import AbstractAlgebra
using Markdown
using Nemo

import Base: abs, checkbounds, deepcopy, deepcopy_internal,
             denominator, div, divrem, exponent,
             gcd, gcdx, getindex, inv, isequal, isless, lcm, length,
             mod, numerator, one, reduce, rem, setindex!, show,
             zero, +, -, *, ==, ^, &, |, <<, >>, ~, <=, >=, <, >, //,
             /, !=

import LinearAlgebra: normalize!, rank

import Statistics: std

import Nemo: add!, addeq!, base_ring, canonical_unit,
             characteristic, check_parent, coeff,
             coeffs, contains, content, crt, degree, divexact,
             elem_type, exponent_vectors, finish, gcdinv,
             gen, gens, intersect, isconstant, ismonomial, isnegative, isone,
             isgen, iszero, isunit, lead, monomials,
             MPolyBuildCtx, mul!, needs_parentheses,
             nvars, ordering, parent_type,
             parent, primpart, promote_rule, push_term!,
             reconstruct, show_minus_one, sort_terms!,
             terms, var_index, zero!, ResidueRing

export base_ring, elem_type, parent_type, parent

export ResidueRing, PolynomialRing, Ideal, MaximalIdeal, FreeModule

export ZZ, QQ, FiniteField, CoefficientRing, Fp

###############################################################################
#
#   Set up environment / load libraries
#
###############################################################################

const pkgdir = realpath(joinpath(dirname(@__FILE__), ".."))
const libsingular = joinpath(pkgdir, "local", "lib", "libSingular")

prefix = realpath(joinpath(@__DIR__, "..", "local"))

function __init__()

   # Initialise Singular

   binSingular = joinpath(prefix, "bin", "Singular")
   ENV["SINGULAR_EXECUTABLE"] = binSingular
   libSingular.siInit(binSingular)
   # set up Singular parents (we cannot do this before Singular is initialised)

   global ZZ = Integers()
   global QQ = Rationals()

   # done in __init__ since headers must be included first

   global n_Z_2_n_Q = libSingular.n_SetMap(ZZ.ptr, QQ.ptr)
   global n_Q_2_n_Z = libSingular.n_SetMap(QQ.ptr, ZZ.ptr)
   ZZ.refcount += 1
   QQ.refcount += 1

   global ringorder_no = libSingular.ringorder_no
   global ringorder_lp = libSingular.ringorder_lp
   global ringorder_rp = libSingular.ringorder_rp
   global ringorder_dp = libSingular.ringorder_dp
   global ringorder_Dp = libSingular.ringorder_Dp
   global ringorder_ls = libSingular.ringorder_ls
   global ringorder_rs = libSingular.ringorder_rs
   global ringorder_ds = libSingular.ringorder_ds
   global ringorder_Ds = libSingular.ringorder_Ds
   global ringorder_c  = libSingular.ringorder_c
   global ringorder_C  = libSingular.ringorder_C

   global sym2ringorder = Dict{Symbol, libSingular.rRingOrder_t}(
     :lex => ringorder_lp,
     :revlex => ringorder_rp,
     :neglex => ringorder_ls,
     :negrevlex => ringorder_rs,
     :degrevlex => ringorder_dp,
     :deglex => ringorder_Dp,
     :negdegrevlex => ringorder_ds,
     :negdeglex => ringorder_Ds,
     :comp1max => ringorder_c,
     :comp1min => ringorder_C
   )
end

###############################################################################
#
#   Load Singular Rings/Fields/etc
#
###############################################################################

include("AbstractTypes.jl")

include("LibSingular.jl")

include("Number.jl")

include("Poly.jl")

include("Module.jl")

include("Ideal.jl")

include("Matrix.jl")

include("Vector.jl")

include("Resolution.jl")

end # module
