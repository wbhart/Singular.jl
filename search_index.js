var documenterSearchIndex = {"docs": [

{
    "location": "index.html#",
    "page": "Getting Started",
    "title": "Getting Started",
    "category": "page",
    "text": ""
},

{
    "location": "index.html#Getting-Started-1",
    "page": "Getting Started",
    "title": "Getting Started",
    "category": "section",
    "text": "Singular.jl is a Julia interface to the Singular computer algebra system. It was written by Oleksandr Motsak, William Hart and other contributors, and is maintained by William Hart, Hans Schoenemann and Andreas Steenpas. It is part of the Oscar project.https://www.singular.uni-kl.de/ (Singular website)\nhttps://github.com/wbhart/Singular.jl (Singular.jl source code)\nhttp://wbhart.github.io/Singular.jl/ (Singular.jl online documentation)The features of Singular so far include:Singular integers, rationals Z/nZ, Z/pZ, Galois fields\nMultivariate polynomials\nIdeals over polynomial rings\nFree modules over polynomial rings and submodules given by a finite generating set\nGroebner basis over a field\nFree/minimal resolutions\nSyzygy modules\nNemo.jl rings can be used as coefficient rings"
},

{
    "location": "index.html#Installation-1",
    "page": "Getting Started",
    "title": "Installation",
    "category": "section",
    "text": "To use Singular.jl we require Julia 0.6 or higher. Please see http://julialang.org/downloads for instructions on how to obtain julia for your system.At the Julia prompt simply typejulia> Pkg.clone(\"https://github.com/wbhart/Singular.jl\")\njulia> Pkg.build(\"Singular\")Note that Singular.jl depends on Cxx.jl which is not supported on every system."
},

{
    "location": "index.html#Quick-start-1",
    "page": "Getting Started",
    "title": "Quick start",
    "category": "section",
    "text": "Here is an example of using Singular.jljulia> using Singular\n\njulia> R, (x, y) = PolynomialRing(QQ, [\"x\", \"y\"])\n(Singular Polynomial Ring (QQ),(x,y),(dp(2),C), Singular.spoly{Singular.n_Q}[x, y])\n\njulia> I = Ideal(R, x^2 + 1, x*y + 1)\nSingular Ideal over Singular Polynomial Ring (QQ),(x,y),(dp(2),C) with generators (x^2+1, x*y+1)\n\njulia> G = std(I)\nSingular Ideal over Singular Polynomial Ring (QQ),(x,y),(dp(2),C) with generators (x-y, y^2+1)\n\njulia> Z = syz(G)\nSingular Module over Singular Polynomial Ring (QQ),(x,y),(dp(2),C), with Generators:\ny^2*gen(1)-x*gen(2)+y*gen(2)+gen(1)\n\njulia> F = fres(G, 0)\nSingular Resolution:\nR^1 <- R^2 <- R^1\n\njulia> F[1]\nSingular Module over Singular Polynomial Ring (QQ),(x,y),(dp(2),C), with Generators:\nx-y\ny^2+1"
},

{
    "location": "integer.html#",
    "page": "Integers",
    "title": "Integers",
    "category": "page",
    "text": "CurrentModule = Singular"
},

{
    "location": "integer.html#Integers-1",
    "page": "Integers",
    "title": "Integers",
    "category": "section",
    "text": "The default integer type in Singular.jl is the Singular n_Z integer type.The associated ring of integers is represented by the constant parent object which can be constructed by a call to Singular.Integers().For convenience we defineZZ = Singular.Integers()so that integers can be constructed using ZZ. Note that this is the name of a specific parent object, not the name of its type.The types of the integer ring parent objects and elements of the associated rings of integers are given in the following table according to the library provding them.Library Element type Parent type\nSingular n_Z Singular.IntegersAll integer element types belong directly to the abstract type RingElem and all the integer ring parent object types belong to the abstract type Ring."
},

{
    "location": "integer.html#Integer-functionality-1",
    "page": "Integers",
    "title": "Integer functionality",
    "category": "section",
    "text": "Singular.jl integers implement the ring and possibly some parts of the Euclidean ring interfaces of AbstractAlgebra.jl.https://nemocas.github.io/AbstractAlgebra.jl/rings.htmlhttps://nemocas.github.io/AbstractAlgebra.jl/euclidean.htmlBelow, we describe the functionality that is specific to the Singular integer ring."
},

{
    "location": "integer.html#Constructors-1",
    "page": "Integers",
    "title": "Constructors",
    "category": "section",
    "text": "ZZ(n::Integer)Coerce a Julia integer value into the integer ring."
},

{
    "location": "integer.html#AbstractAlgebra.Generic.isunit-Tuple{Singular.n_Z}",
    "page": "Integers",
    "title": "AbstractAlgebra.Generic.isunit",
    "category": "Method",
    "text": "isunit(n::n_Z)\n\nReturn true if n is pm 1.\n\n\n\n"
},

{
    "location": "integer.html#Base.denominator-Tuple{Singular.n_Z}",
    "page": "Integers",
    "title": "Base.denominator",
    "category": "Method",
    "text": "denominator(n::n_Z)\n\nReturn the denominator of n (which will always be 1).\n\n\n\n"
},

{
    "location": "integer.html#Base.numerator-Tuple{Singular.n_Z}",
    "page": "Integers",
    "title": "Base.numerator",
    "category": "Method",
    "text": "numerator(n::n_Z)\n\nReturn the numerator of n (which is n itself).\n\n\n\n"
},

{
    "location": "integer.html#Base.abs-Tuple{Singular.n_Z}",
    "page": "Integers",
    "title": "Base.abs",
    "category": "Method",
    "text": "abs(n::n_Z)\n\nReturn the absolute value of n.\n\n\n\n"
},

{
    "location": "integer.html#Basic-manipulation-1",
    "page": "Integers",
    "title": "Basic manipulation",
    "category": "section",
    "text": "isunit(::n_Z)denominator(::n_Z)numerator(::n_Z)abs(::n_Z)Examplesa = ZZ(-12)\n\nisunit(a)\nn = numerator(a)\nd = denominator(a)\nc = abs(a)"
},

{
    "location": "integer.html#Euclidean-division-1",
    "page": "Integers",
    "title": "Euclidean division",
    "category": "section",
    "text": "Singular.jl provides a number of Euclidean division operations. Recall that for a dividend a and divisor b, we can write a = bq + r with 0 leq r  b. We call q the quotient and r the remainder.In the following table we list the division functions and their rounding behaviour. We also give the return value of the function, with q representing return of the quotient and r representing return of the remainder.Function Return Rounding\ndivrem(a::n_Z, b::n_Z) q, r towards zero\nrem(a::n_Z, b::n_Z) r towards zero\nmod(a::n_Z, b::n_Z) r downExamplesa = ZZ(-12)\nb = ZZ(5)\n\nq, r = divrem(a, b)\nr = mod(a, b)\nc = a % b"
},

{
    "location": "integer.html#Comparison-1",
    "page": "Integers",
    "title": "Comparison",
    "category": "section",
    "text": "Here is a list of the comparison functions implemented, with the understanding that isless provides all the usual comparison operators.Function\nisless(a::n_Z, b::n_Z)We also provide the following ad hoc comparisons which again provide all of the comparison operators mentioned above.Function\nisless(a::n_Z, b::Integer)\nisless(a::Integer, b::n_Z)Examplesa = ZZ(12)\nb = ZZ(3)\n\na < b\na != b\na > 4\n5 <= b"
},

{
    "location": "rational.html#",
    "page": "Rational field",
    "title": "Rational field",
    "category": "page",
    "text": "CurrentModule = AbstractAlgebra"
},

{
    "location": "rational.html#Rational-field-1",
    "page": "Rational field",
    "title": "Rational field",
    "category": "section",
    "text": "AbstractAlgebra.jl provides a module, implemented in src/julia/Rational.jl for making Julia Rational{BigInt}s conform to the AbstractAlgebra.jl Field interface.In addition to providing a parent object QQ for Julia Rational{BigInt}s, we implement any additional functionality required by AbstractAlgebra.jl.Because Rational{BigInt} cannot be directly included in the AbstractAlgebra.jl abstract type hierarchy, we achieve integration of Julia Rational{BigInt}s by introducing a type union, called FieldElement, which is a union of AbstractAlgebra.FieldElem and a number of Julia types, including Rational{BigInt}. Everywhere that FieldElem is notionally used in AbstractAlgebra.jl, we are in fact using FieldElement, with additional care being taken to avoid ambiguities.The details of how this is done are technical, and we refer the reader to the implementation for details. For most intents and purposes, one can think of the Julia Rational{BigInt} type as belonging to AbstractAlgebra.FieldElem.One other technicality is that Julia defines certain functions for Rational{BigInt}, such as sqrt and exp differently to what AbstractAlgebra.jl requires. To get around this, we redefine these functions internally to AbstractAlgebra.jl, without redefining them for users of AbstractAlgebra.jl. This allows the internals of AbstractAlgebra.jl to function correctly, without broadcasting pirate definitions of already defined Julia functions to the world.To access the internal definitions, one can use AbstractAlgebra.sqrt and AbstractAlgebra.exp, etc."
},

{
    "location": "rational.html#Types-and-parent-objects-1",
    "page": "Rational field",
    "title": "Types and parent objects",
    "category": "section",
    "text": "Rationals have type Rational{BigInt}, as in Julia itself. We simply supplement the functionality for this type as required for computer algebra.The parent objects of such integers has type Rationals{BigInt}.For convenience, we also make Rational{Int} a part of the AbstractAlgebra.jl type hierarchy and its parent object (accessible as qq) has type Rationals{Int}. But we caution that this type is not particularly useful as a model of the rationals and may not function as expected within AbstractAlgebra.jl."
},

{
    "location": "rational.html#Rational-constructors-1",
    "page": "Rational field",
    "title": "Rational constructors",
    "category": "section",
    "text": "In order to construct rationals in AbstractAlgebra.jl, one can first construct the rational field itself. This is accomplished using either of the following constructors.FractionField(R::Integers{BigInt})Rationals{BigInt}()This gives the unique object of type Rationals{BigInt} representing the field of rationals in AbstractAlgebra.jl.In practice, one simply uses QQ which is assigned to be the return value of the above constructor. There is no need to call the constructor in practice.Here are some examples of creating the rational field and making use of the resulting parent object to coerce various elements into the field.Examplesf = QQ()\ng = QQ(123)\nh = QQ(BigInt(1234))\nk = QQ(BigInt(12), BigInt(7))\n\nQQ == FractionField(ZZ)"
},

{
    "location": "rational.html#Basic-field-functionality-1",
    "page": "Rational field",
    "title": "Basic field functionality",
    "category": "section",
    "text": "The rational field in AbstractAlgebra.jl implements the full Field and Fraction Field interfaces.We give some examples of such functionality.Examplesf = QQ(12, 7)\n\nh = zero(QQ)\nk = one(QQ)\nisone(k) == true\niszero(f) == false\nU = base_ring(QQ)\nV = base_ring(f)\nT = parent(f)\nf == deepcopy(f)\ng = f + 12\nr = ZZ(12)//ZZ(7)\nn = numerator(r)"
},

{
    "location": "rational.html#Rational-functionality-provided-by-AbstractAlgebra.jl-1",
    "page": "Rational field",
    "title": "Rational functionality provided by AbstractAlgebra.jl",
    "category": "section",
    "text": "The functionality below supplements that provided by Julia itself for its Rational{BigInt} type."
},

{
    "location": "rational.html#AbstractAlgebra.sqrt-Tuple{Rational{BigInt}}",
    "page": "Rational field",
    "title": "AbstractAlgebra.sqrt",
    "category": "Method",
    "text": "sqrt{T <: Integer}(a::Rational{T})\n\nReturn the square root of a if it is the square of a rational, otherwise throw an error.\n\n\n\n"
},

{
    "location": "rational.html#AbstractAlgebra.exp-Tuple{Rational{BigInt}}",
    "page": "Rational field",
    "title": "AbstractAlgebra.exp",
    "category": "Method",
    "text": "exp{T <: Integer}(a::Rational{T})\n\nReturn 1 if a = 0, otherwise throw an exception.\n\n\n\n"
},

{
    "location": "rational.html#Square-root-1",
    "page": "Rational field",
    "title": "Square root",
    "category": "section",
    "text": "AbstractAlgebra.sqrt(a::Rational{BigInt})AbstractAlgebra.exp(a::Rational{BigInt})Examplesd = AbstractAlgebra.sqrt(ZZ(36)//ZZ(25))\nm = AbstractAlgebra.exp(ZZ(0)//ZZ(1))"
},

{
    "location": "modn.html#",
    "page": "Integers mod n",
    "title": "Integers mod n",
    "category": "page",
    "text": "CurrentModule = Singular"
},

{
    "location": "modn.html#Integers-mod-n-1",
    "page": "Integers mod n",
    "title": "Integers mod n",
    "category": "section",
    "text": "Integers mod n are implemented via the Singular n_Zn type for any positive modulus that can fit in a Julia Int.The associated ring of integers mod n is represented by a parent object which can be constructed by a call to the ResidueRing constructor.The types of the parent objects and elements of the associated rings of integers modulo n are given in the following table according to the library providing them.Library Element type Parent type\nSingular n_Zn Singular.N_ZnRingAll integer mod n element types belong directly to the abstract type RingElem and all the parent object types belong to the abstract type Ring."
},

{
    "location": "modn.html#Integer-mod-n-functionality-1",
    "page": "Integers mod n",
    "title": "Integer mod n functionality",
    "category": "section",
    "text": "Singular.jl integers modulo n implement the Ring and Residue Ring interfaces of AbstractAlgebra.jl.https://nemocas.github.io/AbstractAlgebra.jl/rings.htmlhttps://nemocas.github.io/AbstractAlgebra.jl/residue_rings.htmlParts of the Euclidean Ring interface may also be implemented, though Singular will report an error if division is meaningless (even after cancelling zero divisors).https://nemocas.github.io/AbstractAlgebra.jl/euclidean.htmlBelow, we describe the functionality that is specific to the Singular integers mod n ring and not already listed at the given links."
},

{
    "location": "modn.html#Constructors-1",
    "page": "Integers mod n",
    "title": "Constructors",
    "category": "section",
    "text": "Given a ring R of integers modulo n, we also have the following coercions in addition to the standard ones expected.R(n::n_Z)\nR(n::fmpz)Coerce a Singular or Flint integer value into the ring."
},

{
    "location": "modn.html#AbstractAlgebra.Generic.characteristic-Tuple{Singular.n_Zn}",
    "page": "Integers mod n",
    "title": "AbstractAlgebra.Generic.characteristic",
    "category": "Method",
    "text": "characteristic{T <: RingElem}(R::AbstractAlgebra.FracField{T})\n\nReturn the characteristic of the given field.\n\n\n\n"
},

{
    "location": "modn.html#Basic-manipulation-1",
    "page": "Integers mod n",
    "title": "Basic manipulation",
    "category": "section",
    "text": "isunit(::n_Zn)characteristic(::n_Zn)ExamplesR = ResidueRing(ZZ, 26)\na = R(5)\n\nisunit(a)\nc = characteristic(R)"
},

]}
