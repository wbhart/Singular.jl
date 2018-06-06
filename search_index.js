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
    "text": "CurrentModule = Singular"
},

{
    "location": "rational.html#Rational-field-1",
    "page": "Rational field",
    "title": "Rational field",
    "category": "section",
    "text": "Singular.jl provides rational numbers via Singular\'s n_Q type.There is a constant parent object representing the field of rationals, called QQ in Singular.jl. It is defined by QQ = Rationals(), which calls the constructor for the unique field of rationals in Singular."
},

{
    "location": "rational.html#Rational-functionality-1",
    "page": "Rational field",
    "title": "Rational functionality",
    "category": "section",
    "text": "The rationals in Singular.jl implement the Field interface defined by AbstractAlgebra.jl. They also implement the Fraction Field interface.https://nemocas.github.io/AbstractAlgebra.jl/fields.htmlhttps://nemocas.github.io/AbstractAlgebra.jl/fraction_fields.htmlWe describe here only the extra functionality provided by Singular that is not already described in those interfaces."
},

{
    "location": "rational.html#Constructors-1",
    "page": "Rational field",
    "title": "Constructors",
    "category": "section",
    "text": "In addition to the standard constructors required for the interfaces listed above, Singular.jl provides the following constructors.QQ(n::n_Z)\nQQ(n::fmpz)Construct a Singular rational from the given integer n."
},

{
    "location": "rational.html#Base.numerator-Tuple{Singular.n_Q}",
    "page": "Rational field",
    "title": "Base.numerator",
    "category": "Method",
    "text": "numerator(n::n_Q)\n\nReturn the numerator of the given fraction.\n\n\n\n"
},

{
    "location": "rational.html#Base.denominator-Tuple{Singular.n_Q}",
    "page": "Rational field",
    "title": "Base.denominator",
    "category": "Method",
    "text": "denominator(n::n_Q)\n\nReturn the denominator of the given fraction.\n\n\n\n"
},

{
    "location": "rational.html#Base.abs-Tuple{Singular.n_Q}",
    "page": "Rational field",
    "title": "Base.abs",
    "category": "Method",
    "text": "abs(n::n_Q)\n\nReturn the absolute value of the given fraction.\n\n\n\n"
},

{
    "location": "rational.html#Basic-manipulation-1",
    "page": "Rational field",
    "title": "Basic manipulation",
    "category": "section",
    "text": "numerator(::n_Q)denominator(::n_Q)abs(::n_Q)f = QQ(-12, 7)\n\nh = numerator(QQ)\nk = denominator(QQ)\nm = abs(f)"
},

{
    "location": "rational.html#Comparison-1",
    "page": "Rational field",
    "title": "Comparison",
    "category": "section",
    "text": "Here is a list of the comparison functions implemented, with the understanding that isless provides all the usual comparison operators.Function\nisless(a::n_Q, b::n_Q)We also provide the following ad hoc comparisons which again provide all of the comparison operators mentioned above.Function\nisless(a::n_Q, b::Integer)\nisless(a::Integer, b::n_Q)Examplesa = QQ(12, 7)\nb = QQ(-3, 5)\n\na > b\na != b\na > 1\n5 >= b"
},

{
    "location": "rational.html#Nemo.reconstruct-Tuple{Singular.n_Z,Singular.n_Z}",
    "page": "Rational field",
    "title": "Nemo.reconstruct",
    "category": "Method",
    "text": "reconstruct(x::n_Z, y::n_Z)\n\nGiven x modulo y, find rs such that x equiv rs pmody for values r and s satisfying the bound y  2(r + 1)(s + 1).\n\n\n\n"
},

{
    "location": "rational.html#Rational-reconstruction-1",
    "page": "Rational field",
    "title": "Rational reconstruction",
    "category": "section",
    "text": "reconstruct(::n_Z, ::n_Z)The following ad hoc versions of the same function also exist.reconstruct(::n_Z, ::Integer)\nreconstruct(::Integer, ::n_Z)Examplesq1 = reconstruct(ZZ(7), ZZ(3))\nq2 = reconstruct(ZZ(7), 5)"
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
    "location": "modn.html#AbstractAlgebra.Generic.isunit-Tuple{Singular.n_Zn}",
    "page": "Integers mod n",
    "title": "AbstractAlgebra.Generic.isunit",
    "category": "Method",
    "text": "isunit(n::n_Zn)\n\nReturn true if the given value is a unit in the integers modulo n.\n\n\n\n"
},

{
    "location": "modn.html#AbstractAlgebra.Generic.characteristic-Tuple{Singular.N_ZnRing}",
    "page": "Integers mod n",
    "title": "AbstractAlgebra.Generic.characteristic",
    "category": "Method",
    "text": "characteristic(R::N_ZnRing)\n\nReturn the characteristic n of the ring.\n\n\n\n"
},

{
    "location": "modn.html#Basic-manipulation-1",
    "page": "Integers mod n",
    "title": "Basic manipulation",
    "category": "section",
    "text": "isunit(::n_Zn)Singular.characteristic(::N_ZnRing)ExamplesR = ResidueRing(ZZ, 26)\na = R(5)\n\nisunit(a)\nc = characteristic(R)"
},

{
    "location": "modp.html#",
    "page": "Integers mod p",
    "title": "Integers mod p",
    "category": "page",
    "text": "CurrentModule = Singular"
},

{
    "location": "modp.html#Integers-mod-p-1",
    "page": "Integers mod p",
    "title": "Integers mod p",
    "category": "section",
    "text": "Integers mod a prime p are implemented via the Singular n_Zp type for any positive prime modulus that can fit in a Julia Int.The associated field of integers mod p is represented by a parent object which can be constructed by a call to the Fp constructor.The types of the parent objects and elements of the associated fields of integers modulo p are given in the following table according to the library providing them.Library Element type Parent type\nSingular n_Zp Singular.N_ZpFieldAll integer mod p element types belong directly to the abstract type FieldElem and all the parent object types belong to the abstract type Field."
},

{
    "location": "modp.html#Integer-mod-p-functionality-1",
    "page": "Integers mod p",
    "title": "Integer mod p functionality",
    "category": "section",
    "text": "Singular.jl integers modulo n implement the Field and Residue Ring interfaces of AbstractAlgebra.jl.https://nemocas.github.io/AbstractAlgebra.jl/fields.htmlhttps://nemocas.github.io/AbstractAlgebra.jl/residue_rings.htmlBelow, we describe the functionality that is specific to the Singular integers mod p field and not already listed at the given links."
},

{
    "location": "modp.html#Constructors-1",
    "page": "Integers mod p",
    "title": "Constructors",
    "category": "section",
    "text": "The following constructors are available to create the field of integers modulo a prime p.Fp(p::Int; cached=true)Construct the field of integers modulo p. By default, the field is cached, so that all fields of integers modulo p have the same parent object. If this is not the desired behaviour, the cached paramater can be set to false. If p is not a prime, and exception is raised.Given a field R of integers modulo p, we also have the following coercions in addition to the standard ones expected.R(n::n_Z)\nR(n::fmpz)Coerce a Singular or Flint integer value into the field."
},

{
    "location": "modp.html#AbstractAlgebra.Generic.isunit-Tuple{Singular.n_Zp}",
    "page": "Integers mod p",
    "title": "AbstractAlgebra.Generic.isunit",
    "category": "Method",
    "text": "isunit(n::n_Zp)\n\nReturn true if n is a unit in the field, i.e. nonzero.\n\n\n\n"
},

{
    "location": "modp.html#AbstractAlgebra.Generic.characteristic-Tuple{Singular.N_ZpField}",
    "page": "Integers mod p",
    "title": "AbstractAlgebra.Generic.characteristic",
    "category": "Method",
    "text": "characteristic(R::N_ZpField)\n\nReturn the characteristic of the field.\n\n\n\n"
},

{
    "location": "modp.html#Basic-manipulation-1",
    "page": "Integers mod p",
    "title": "Basic manipulation",
    "category": "section",
    "text": "isunit(::n_Zp)Singular.characteristic(::N_ZpField)ExamplesR = Fp(23)\na = R(5)\n\nisunit(a)\nc = characteristic(R)"
},

]}
