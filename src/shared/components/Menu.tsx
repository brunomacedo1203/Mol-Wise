import React from "react";
import { IconHospital, IconScale } from "@tabler/icons-react";
import MenuItem from "@/shared/components/MenuItem";

export interface MenuProps {
  collapsed: boolean;
  onSectionSelect?: (section: string) => void;
}

export default function Menu({ collapsed, onSectionSelect }: MenuProps) {
  return (
    <div
      className={`
    text-3xl pl-2 gap-2
    flex flex-col justify-start items-start
    ${collapsed ? "w-16" : "w-70"} 
    text-zinc-900 
    dark:text-zinc-100
  `}
    >
      <div onClick={() => onSectionSelect && onSectionSelect("periodic")}>
        <MenuItem
          icone={<IconHospital />}
          label={collapsed ? "" : "Periodic Table"}
          url="/PeriodicTable"
        />
      </div>

      {!collapsed && (
        <span className="text-sm text-zinc-500 self-start pl-3 pt-1">
          Calculators
        </span>
      )}

      <div onClick={() => onSectionSelect && onSectionSelect("calculator")}>
        <MenuItem
          icone={<IconScale />}
          label={collapsed ? "" : "Molar Mass calculator"}
          url="/MolarMassCalculator"
        />
      </div>
      {/* <div onClick={() => onSectionSelect && onSectionSelect("calculator")}> 
              <MenuItem
                icone={<IconScale />}
                label={collapsed ? "" : "Standard calculator"}
                url="/StandardCalculator"
              />
            </div>
            */}
      {/*<div onClick={() => onSectionSelect && onSectionSelect("concentration")}> 
              <MenuItem
                icone={<IconCalculator />}
                label={collapsed ? "" : "Concentration calculator"}
                url="/ConcentrationCalculator"
              />
            </div>
            <div onClick={() => onSectionSelect && onSectionSelect("dilution")}> 
              <MenuItem
                icone={<IconRulerMeasure />}
                label={collapsed ? "" : "Dilution calculator"}
                url="/DilutionCalculator"
              />
            </div>
            <div onClick={() => onSectionSelect && onSectionSelect("study_organization")}> 
              <MenuItem
                icone={<IconSitemap />}
                label={collapsed ? "" : "Study Organization"}
                url="/study_organization"
              />
            </div>*/}
    </div>
  );
}
