function id_Delete(I::ideal, R::ring)
   icxx"""id_Delete(&$I, $R);"""
end

function id_Copy(I::ideal, R::ring)
   icxx"""id_Copy($I, $R);"""
end

function idInit(size::Cint, rank = Cint(1))
   icxx"""idInit($size, $rank);"""
end

function setindex!(I::ideal, x::poly, j::Cint)
   icxx"""$I->m[$j] = $x;"""
end

function getindex(I::ideal, j::Cint)
   icxx"""(poly) ($I->m[$j]);"""
end

function idIs0(I::ideal)
   icxx"""idIs0($I);"""
end

function id_IsConstant(I::ideal, R::ring)
   icxx"""id_IsConstant($I, $R);"""
end

function id_IsZeroDim(I::ideal, R::ring)
   icxx"""id_IsZeroDim($I, $R);"""
end

function idElem(I::ideal)
   icxx"""idElem($I);"""
end

function id_Normalize(I::ideal, R::ring)
   icxx"""id_Normalize($I, $R);"""
end

function id_Head(I::ideal, R::ring)
   icxx"""id_Head($I, $R);"""
end

function id_MaxIdeal(d::Cint, R::ring)
   icxx"""id_MaxIdeal($d, $R);"""
end

function id_Add(I::ideal, J::ideal, R::ring)
   icxx"""id_Add($I, $J, $R);"""
end

function id_Mult(I::ideal, J::ideal, R::ring)
   icxx"""id_Mult($I, $J, $R);"""
end

function id_Power(I::ideal, n::Cint, R::ring)
   icxx"""id_Power($I, $n, $R);"""
end

function id_IsEqual(I1::ideal, I2::ideal, R::ring)
   icxx"""mp_Equal((ip_smatrix *) $I1, (ip_smatrix *) $I2, $R);"""
end

function id_FreeModule(n::Cint, R::ring)
   icxx"""id_FreeModule($n, $R);"""
end

function idSkipZeroes(I::ideal)
   icxx"""idSkipZeroes($I);"""
end

function ngens(I::ideal)
   icxx"""(int) IDELEMS($I);"""
end

function rank(I::ideal)
   icxx"""(int) $I->rank;"""
end

function id_Quotient(A::ideal, B::ideal, AisGB::Bool, R::ring)
   icxx"""const ring origin = currRing;
          rChangeCurrRing($R);
          ideal id = idQuot($A, $B, $AisGB, TRUE);
          rChangeCurrRing(origin);
          id;
       """
end

function id_Intersection(A::ideal, B::ideal, R::ring)
   icxx"""const ring origin = currRing;
          rChangeCurrRing($R);
          ideal id = idSect($A, $B);
          rChangeCurrRing(origin);
          id;
       """
end

function id_Slimgb(I::ideal, R::ring; complete_reduction::Bool=false)
   if complete_reduction
      crbit = icxx"""Sy_bit(OPT_REDSB);"""
   else
      crbit = Cuint(0);
   end
   icxx"""ideal id = NULL;
          if (!idIs0($I))
          {
             intvec * n = NULL;
             tHomog h = testHomog;
             const ring origin = currRing;
             unsigned int save_opt = si_opt_1;
             si_opt_1 |= $crbit;
             rChangeCurrRing($R);
             id = t_rep_gb($R, $I, $I->rank);
             si_opt_1 = save_opt;
             rChangeCurrRing(origin);
             if (n != NULL)
                delete n;
          } else
             id = idInit(0, $I->rank);
          id;
       """
end

function id_Std(I::ideal, R::ring; complete_reduction::Bool=false)
   if complete_reduction
      crbit = icxx"""Sy_bit(OPT_REDSB);"""
   else
      crbit = Cuint(0);
   end
   icxx"""ideal id = NULL;
          if (!idIs0($I))
          {
             intvec * n = NULL;
             tHomog h = testHomog;
             const ring origin = currRing;
             unsigned int save_opt = si_opt_1;
             si_opt_1 |= $crbit;
             rChangeCurrRing($R);
             id = kStd($I, $R->qideal, h, &n);
             si_opt_1 = save_opt;
             rChangeCurrRing(origin);
             if (n != NULL)
                delete n;
          } else
             id = idInit(0, $I->rank);
          id;
       """
end

function id_Syzygies(I:: ideal, R::ring)
   icxx"""ideal id = NULL;
          intvec * n = NULL;
          tHomog h = testHomog;
          const ring origin = currRing;
          rChangeCurrRing($R);
          id = idSyzygies($I, h, &n);
          rChangeCurrRing(origin);
          if (n != NULL)
             delete n;
          id;
       """
end

function id_fres(I::ideal, n::Cint, method::String, R::ring)
   s = icxx"""const ring origin = currRing;
         rChangeCurrRing($R);
         syStrategy s = syFrank($I, $n, $method);
         rChangeCurrRing(origin);
         s;
      """
   r = icxx"""$s->minres;"""
   minimal = true
   if r == C_NULL
      r = icxx"""$s->fullres;"""
      minimal = false
   end
   length = icxx"""$s->length;"""
   r, Int(length), minimal
end

function id_sres(I::ideal, n::Cint, R::ring)
   s = icxx"""const ring origin = currRing;
         rChangeCurrRing($R);
         syStrategy s = sySchreyer($I, $n);
         rChangeCurrRing(origin);
         s;
      """
   r = icxx"""$s->minres;"""
   minimal = true
   if r == C_NULL
      r = icxx"""$s->fullres;"""
      minimal = false
   end
   length = icxx"""$s->length;"""
   r, Int(length), minimal
end

function id_Eliminate(I::ideal, v::poly, R::ring)
   icxx"""const ring origin = currRing;
          rChangeCurrRing($R);
          ideal res = idElimination($I, $v);
          rChangeCurrRing(origin);
          res;
       """
end

function id_Satstd(I::ideal, J::ideal, R::ring)
   icxx"""id_Satstd($I, $J, $R);"""
end

function id_Array2Vector(m::Array{poly,1},n::Int, R::ring)
   p=pointer(m)
   icxx"""id_Array2Vector($p, $n, $R);"""
end

function p_Vector2Array(v::poly, m::Array{poly,1}, n::Int, R::ring)
   p=pointer(m)
   icxx"""p_Vec2Array($v, $p, $n, $R);"""
end

function maGetPreimage(target::ring, map::ideal, id::ideal, source::ring)
   preimage_ptr = icxx"""
      sip_smap sing_map = { $map->m, (char *)"julia_ring", 1, $map->ncols };
      return maGetPreimage($target, &sing_map, $id, $source);
   """
   return preimage_ptr;
end

function id_Jet(I::ideal, n::Cint, r::ring)
   icxx"""id_Jet($I,$n,$r);"""
end

function id_vdim(I::ideal,r::ring)
   icxx"""
	const ring origin = currRing;
        rChangeCurrRing($r);
        int n=scMult0Int($I, $r->qideal);
	rChangeCurrRing(origin);
	n;
"""
end

function id_kbase(I::ideal,r::ring)
   icxx""" ideal K;
        const ring origin = currRing;
        rChangeCurrRing($r);
        K=scKBase(-1,$I, $r->qideal);
        rChangeCurrRing(origin);
        K;
"""
end

function id_highcorner(I::ideal,r::ring)
   icxx"""
       const ring origin = currRing;
       rChangeCurrRing($r);
       poly h=iiHighCorner($I,0);
       rChangeCurrRing(origin);
       h;
"""
end

