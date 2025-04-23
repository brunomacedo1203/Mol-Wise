import React from "react";
import {
  IconCalculator,
  IconHospital,
  IconRulerMeasure,
  IconScale,
  IconSitemap,
} from "@tabler/icons-react";
import MenuItem from "@/shared/components/MenuItem";

export interface MenuProps {
  collapsed: boolean;
}

export default function Menu({ collapsed }: MenuProps) {
  return (
    <div
      className={`
        text-3xl p-2 gap-2
        flex flex-col justify-start items-center
        ${collapsed ? "w-16" : "w-70"} 
        text-zinc-900 
      `}
    >
      <MenuItem
        icone={<IconHospital />}
        label={collapsed ? "" : "Periodic Table"}
        url="/PeriodicTable"
      />

      {!collapsed && (
        <span className="text-sm text-zinc-500 self-start pl-3 pt-1">
          Calculators
        </span>
      )}

      <MenuItem
        icone={<IconScale />}
        label={collapsed ? "" : "Molar Mass calculator"}
        url="/MolarMassCalculator"
      />
      <MenuItem
        icone={<IconScale />}
        label={collapsed ? "" : "Standard calculator"}
        url="/StandardCalculator"
      />
      {/*<MenuItem
        icone={<IconCalculator />}
        label={collapsed ? "" : "Concentration calculator"}
        url="/ConcentrationCalculator"
      />
      <MenuItem
        icone={<IconRulerMeasure />}
        label={collapsed ? "" : "Dilution calculator"}
        url="/DilutionCalculator"
      />
      <MenuItem
        icone={<IconSitemap />}
        label={collapsed ? "" : "Study Organization"}
        url="/study_organization"
      />*/}
    </div>
  );
}
