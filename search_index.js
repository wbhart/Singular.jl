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
    "text": "Singular.jl is a Julia interface to the Singular computer algebra system. It was written by Oleksandr Motsak, William Hart and other contributors, and is maintained by William Hart, Hans Schoenemann and Andreas Steenpas. It is part of the Oscar project.https://www.singular.uni-kl.de/ (Singular website)\nhttps://github.com/wbhart/Singular.jl (Singular.jl source code)\nhttp://wbhart.github.io/Singular.jl/latest/ (Singular.jl online documentation)The features of Singular so far include:Singular integers, rationals Z/nZ, Z/pZ, Galois fields\nMultivariate polynomials\nIdeals over polynomial rings\nFree modules over polynomial rings and submodules given by a finite generating set\nGroebner basis over a field\nFree/minimal resolutions\nSyzygy modules\nNemo.jl rings can be used as coefficient rings"
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

]}
