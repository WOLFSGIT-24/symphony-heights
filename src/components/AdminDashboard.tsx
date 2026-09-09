import React, { useState } from "react";
import { X, ClipboardList, Download, Trash2, CheckCircle2 } from "lucide-react";
import { LeadSubmission } from "@/lib/data";

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  leads: LeadSubmission[];
  onUpdateStatus: (id: string, status: LeadSubmission["status"]) => void;
  onClearLeads: () => void;
  onAddMockLeads: () => void;
}

export default function AdminDashboard({
  isOpen,
  onClose,
  leads,
  onUpdateStatus,
  onClearLeads,
  onAddMockLeads,
}: AdminDashboardProps) {
  if (!isOpen) return null;

  const [filter, setFilter] = useState<LeadSubmission["status"] | "All">("All");

  const filteredLeads =
    filter === "All" ? leads : leads.filter((lead) => lead.status === filter);

  const stats = {
    total: leads.length,
    pending: leads.filter((l) => l.status === "Pending").length,
    contacted: leads.filter((l) => l.status === "Contacted").length,
    scheduled: leads.filter((l) => l.status === "Scheduled").length,
  };

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(leads, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `Symphony_Heights_Inquiries_${new Date().toISOString().split("T")[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="fixed inset-0 bg-navy-dark/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div className="bg-white rounded-xl shadow-2xl max-w-5xl w-full max-h-[85vh] flex flex-col overflow-hidden border border-navy-primary/10">
        {/* Header Console */}
        <div className="bg-navy-primary p-6 text-white flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/10 rounded-lg">
              <ClipboardList className="h-5 w-5 text-gold" />
            </div>
            <div>
              <h3 className="font-display text-lg sm:text-xl font-bold tracking-tight">
                Sales Partner Console
              </h3>
              <p className="text-[10px] text-champagne uppercase tracking-widest font-bold">
                Real-Time Inquiry Pipeline & Site Appointments
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/5 hover:bg-white/15 transition-all text-white/80 hover:text-white cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Analytics Highlights Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 border-b border-gray-100 bg-[#FBF9FB]">
          <div className="p-4 border-r border-gray-100 text-center">
            <span className="block text-[9px] font-extrabold text-gray-text uppercase tracking-widest">
              Total Inquiries
            </span>
            <span className="font-display text-2xl font-bold text-navy-primary">{stats.total}</span>
          </div>
          <div className="p-4 border-r border-gray-100 text-center">
            <span className="block text-[9px] font-extrabold text-gray-text uppercase tracking-widest text-amber-600">
              Pending Validation
            </span>
            <span className="font-display text-2xl font-bold text-amber-600">{stats.pending}</span>
          </div>
          <div className="p-4 border-r border-gray-100 text-center">
            <span className="block text-[9px] font-extrabold text-gray-text uppercase tracking-widest text-indigo-600">
              Contacted Leads
            </span>
            <span className="font-display text-2xl font-bold text-indigo-600">{stats.contacted}</span>
          </div>
          <div className="p-4 text-center">
            <span className="block text-[9px] font-extrabold text-gray-text uppercase tracking-widest text-green-600">
              Site Visits Scheduled
            </span>
            <span className="font-display text-2xl font-bold text-green-600">{stats.scheduled}</span>
          </div>
        </div>

        {/* Actions & Filters Bar */}
        <div className="p-4 border-b border-gray-100 flex flex-wrap items-center justify-between gap-3 bg-white">
          <div className="flex gap-2">
            {(["All", "Pending", "Contacted", "Scheduled"] as const).map((st) => (
              <button
                key={st}
                onClick={() => setFilter(st)}
                className={`text-xs px-3 py-1.5 rounded font-body font-semibold transition-colors cursor-pointer ${
                  filter === st
                    ? "bg-navy-primary text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportJSON}
              className="flex items-center gap-1.5 text-xs font-bold text-navy-primary border border-navy-primary/20 px-3 py-1.5 rounded hover:bg-navy-primary/5 cursor-pointer font-body"
            >
              <Download className="h-3.5 w-3.5" />
              Export JSON
            </button>
            <button
              onClick={onClearLeads}
              className="flex items-center gap-1.5 text-xs font-bold text-red-600 border border-red-200 px-3 py-1.5 rounded hover:bg-red-50 cursor-pointer font-body"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Clear
            </button>
          </div>
        </div>

        {/* Leads Table */}
        <div className="flex-1 overflow-y-auto p-4">
          {filteredLeads.length === 0 ? (
            <div className="text-center py-12 text-gray-400 font-body text-sm">
              No inquiries found in this view.
            </div>
          ) : (
            <div className="space-y-2.5">
              {filteredLeads.map((lead) => (
                <div
                  key={lead.id}
                  className="p-4 rounded-lg border border-gray-100 bg-white shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-3 font-body text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-navy-primary text-sm">{lead.fullName}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-gray-100 text-gray-600 font-mono">
                        {lead.id}
                      </span>
                    </div>
                    <div className="text-gray-500 flex flex-wrap gap-x-4 gap-y-1 text-[11px]">
                      <span>📞 {lead.phone}</span>
                      <span>✉️ {lead.email}</span>
                      {lead.preferredDate && <span>📅 Visit: {lead.preferredDate} {lead.preferredTime}</span>}
                    </div>
                    {lead.notes && <p className="text-gray-600 italic text-[11px]">{lead.notes}</p>}
                  </div>

                  <div className="flex items-center gap-2 self-end md:self-center">
                    <select
                      value={lead.status}
                      onChange={(e) => onUpdateStatus(lead.id, e.target.value as LeadSubmission["status"])}
                      className="border border-gray-200 rounded px-2 py-1 text-xs font-semibold text-navy-primary bg-white focus:outline-none"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Contacted">Contacted</option>
                      <option value="Scheduled">Scheduled</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
