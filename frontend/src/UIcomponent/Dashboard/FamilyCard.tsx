import { useMemo, type CSSProperties } from "react";
import ReactFlow, { Background, Controls } from "reactflow";
import "reactflow/dist/style.css";
import { useLocation } from "react-router-dom";

type FlowNode = {
  id: string;
  data: { label: string };
  position: { x: number; y: number };
  style?: CSSProperties;
};

type FlowEdge = {
  id: string;
  source: string;
  target: string;
  animated?: boolean;
  type?: string;
};

interface Member {
  id: number;
  fullName: string;
  gender?: string;
  father?: string;
  mother?: string;
  grandfather?: string;
  grandmother?: string;
  children?: string[] | string | null;
  file?: string | null;
  phone?: string;
  village?: string;
  address?: string | null;
  created_at?: string;
  profile_pic?: string | null;
}

const resolveImageUrl = (value?: string | null) =>
  value
    ? value.startsWith("http")
      ? value
      : `http://localhost:5000/uploads/${value}`
    : "https://dummyimage.com/160x160/cccccc/000000&text=No+Image";

const normalizeChildren = (children?: string[] | string | null) => {
  if (!children) return [];
  if (Array.isArray(children)) return children.filter(Boolean);
  return children
    .split(",")
    .map((child) => child.trim())
    .filter(Boolean);
};

const FamilyCard = () => {
  const location = useLocation();
  const member = location.state?.member as Member | undefined;

  if (!member)
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4 py-10">
        <div className="rounded-3xl bg-white p-10 shadow-xl text-center">
          <p className="text-lg font-semibold text-slate-900">No member data found.</p>
          <p className="mt-2 text-slate-500">Please open the family profile from the members list.</p>
        </div>
      </div>
    );

  const childNames = normalizeChildren(member.children);

  const nodes: FlowNode[] = useMemo(
    () => [
      {
        id: "grandfather",
        position: { x: 40, y: 0 },
        data: { label: `${member.grandfather || "Unknown"}\nGrandfather` },
        style: {
          width: 220,
          padding: 16,
          borderRadius: 22,
          background: "#eef2ff",
          border: "1px solid #c7d2fe",
          color: "#3730a3",
          whiteSpace: "pre-wrap",
        },
      },
      {
        id: "grandmother",
        position: { x: 320, y: 0 },
        data: { label: `${member.grandmother || "Unknown"}\nGrandmother` },
        style: {
          width: 220,
          padding: 16,
          borderRadius: 22,
          background: "#eef2ff",
          border: "1px solid #c7d2fe",
          color: "#3730a3",
          whiteSpace: "pre-wrap",
        },
      },
      {
        id: "father",
        position: { x: 40, y: 140 },
        data: { label: `${member.father || "Unknown"}\nFather` },
        style: {
          width: 220,
          padding: 16,
          borderRadius: 22,
          background: "#f8fafc",
          border: "1px solid #cbd5e1",
          color: "#0f172a",
          whiteSpace: "pre-wrap",
        },
      },
      {
        id: "mother",
        position: { x: 320, y: 140 },
        data: { label: `${member.mother || "Unknown"}\nMother` },
        style: {
          width: 220,
          padding: 16,
          borderRadius: 22,
          background: "#f8fafc",
          border: "1px solid #cbd5e1",
          color: "#0f172a",
          whiteSpace: "pre-wrap",
        },
      },
      {
        id: "self",
        position: { x: 180, y: 280 },
        data: { label: `${member.fullName || "Profile"}\nSelf` },
        style: {
          width: 240,
          padding: 18,
          borderRadius: 28,
          background: "#4338ca",
          border: "1px solid #c7d2fe",
          color: "white",
          fontWeight: "600",
          whiteSpace: "pre-wrap",
        },
      },
      ...childNames.map((child, index) => ({
        id: `child-${index}`,
        position: { x: 20 + index * 180, y: 420 },
        data: { label: `${child}\nChild` },
        style: {
          width: 200,
          padding: 14,
          borderRadius: 22,
          background: "#f0f9ff",
          border: "1px solid #bae6fd",
          color: "#0369a1",
          whiteSpace: "pre-wrap",
        },
      })),
    ],
    [member, childNames]
  );

  const edges: FlowEdge[] = useMemo(
    () => [
      { id: "e1", source: "grandfather", target: "father", animated: true },
      { id: "e2", source: "grandmother", target: "mother", animated: true },
      { id: "e3", source: "father", target: "self", animated: true },
      { id: "e4", source: "mother", target: "self", animated: true },
      ...childNames.map((_, index) => ({
        id: `e-child-${index}`,
        source: "self",
        target: `child-${index}`,
        animated: true,
      })),
    ],
    [childNames]
  );

  return (
    <div className="min-h-screen bg-slate-100 py-8 px-4">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
            <img
              src={resolveImageUrl(member.profile_pic || member.file)}
              alt={member.fullName}
              className="h-32 w-32 rounded-3xl object-cover ring-4 ring-indigo-100"
              onError={(e) => {
                e.currentTarget.src = "https://dummyimage.com/160x160/cccccc/000000&text=No+Image";
              }}
            />
            <div className="flex-1">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">
                Family profile
              </p>
              <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900">
                {member.fullName}
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
                A complete lineage overview with contact details, ancestry, and family tree for {member.fullName}.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <StatCard label="Gender" value={member.gender || "Not specified"} />
                <StatCard label="Phone" value={member.phone || "Not available"} />
                <StatCard label="Village" value={member.village || "Not available"} />
                <StatCard label="Created" value={member.created_at ? new Date(member.created_at).toLocaleDateString() : "Unknown"} />
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.1fr_1fr]">
          <div className="space-y-6">
            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-5 flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                    Lineage details
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold text-slate-900">Ancestry overview</h2>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <DetailRow label="Grandfather" value={member.grandfather || "Unknown"} />
                <DetailRow label="Grandmother" value={member.grandmother || "Unknown"} />
                <DetailRow label="Father" value={member.father || "Unknown"} />
                <DetailRow label="Mother" value={member.mother || "Unknown"} />
                {/* <DetailRow label="Address" value={member.address || "Not provided"} /> */}
                <DetailRow label="Children" value={childNames.length ? childNames.length.toString() : "0"} />
              </div>
            </div>

            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-5">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Children list
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-slate-900">Next generation</h2>
              </div>
              {childNames.length > 0 ? (
                <div className="grid gap-3">
                  {childNames.map((child, index) => (
                    <div
                      key={index}
                      className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 shadow-sm"
                    >
                      <p className="font-medium text-slate-900">{child}</p>
                      <p className="text-sm text-slate-500">Child of {member.fullName}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-slate-500">No children recorded for this profile.</p>
              )}
            </div>
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                Family Tree
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900">Relationship map</h2>
            </div>
            <div className="h-140 rounded-[30px] border border-slate-200 bg-slate-50 overflow-hidden">
              <ReactFlow
                nodes={nodes}
                edges={edges}
                fitView
                nodesDraggable={false}
                nodesConnectable={false}
                panOnDrag={false}
                zoomOnScroll={false}
                zoomOnPinch={false}
              >
                <Controls showInteractive={false} />
                <Background gap={16} color="#e2e8f0" />
              </ReactFlow>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ label, value }: { label: string; value: string }) => (
  <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
    <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">{label}</p>
    <p className="mt-2 text-lg font-semibold text-slate-900">{value}</p>
  </div>
);

const DetailRow = ({ label, value }: { label: string; value: string }) => (
  <div className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3">
    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{label}</p>
    <p className="mt-2 text-sm text-slate-700">{value}</p>
  </div>
);

export default FamilyCard;
