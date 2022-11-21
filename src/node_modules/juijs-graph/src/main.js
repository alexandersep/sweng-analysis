import jui from './base/base.js'
import DomUtil from './util/dom.js'
import MathUtil from './util/math.js'
import ColorUtil from './util/color.js'
import UICollection from './base/collection.js'
import UIManager from './base/manager.js'
import UICore from './base/core.js'

import TimeUtil from './util/time.js'
import TransformUtil from './util/transform.js'
import CanvasUtil from './util/canvas/base.js'
import CanvasHidpiUtil from './util/canvas/hidpi.js'
import SvgElementUtil from './util/svg/element.js'
import SvgTransformElementUtil from './util/svg/element.transform.js'
import SvgPathElementUtil from './util/svg/element.path.js'
import SvgPathRectElementUtil from './util/svg/element.path.rect.js'
import SvgPathSymbolElementUtil from './util/svg/element.path.symbol.js'
import SvgPolyElementUtil from './util/svg/element.poly.js'
import SvgBaseUtil from './util/svg/base.js'
import SvgBase3dUtil from './util/svg/base3d.js'
import SvgUtil from './util/svg.js'
import LinearScaleUtil from './util/scale/linear.js'
import CircleScaleUtil from './util/scale/circle.js'
import LogScaleUtil from './util/scale/log.js'
import OrdinalScaleUtil from './util/scale/ordinal.js'
import TimeScaleUtil from './util/scale/time.js'
import ScaleUtil from './util/scale.js'
import Vector from './base/vector.js'
import Draw from './base/draw.js'
import Axis from './base/axis.js'
import Map from './base/map.js'
import Builder from './base/builder.js'
import Plane from './base/plane.js'
import Animation from './base/animation.js'
import CorePolygon from './polygon/core.js'
import GridPolygon from './polygon/grid.js'
import LinePolygon from './polygon/line.js'
import PointPolygon from './polygon/point.js'
import CubePolygon from './polygon/cube.js'
import Draw2dGrid from './grid/draw2d.js'
import Draw3dGrid from './grid/draw3d.js'
import CoreGrid from './grid/core.js'
import BlockGrid from './grid/block.js'
import DateGrid from './grid/date.js'
import DateBlockGrid from './grid/dateblock.js'
import FullBlockGrid from './grid/fullblock.js'
import RadarGrid from './grid/radar.js'
import RangeGrid from './grid/range.js'
import LogGrid from './grid/log.js'
import RuleGrid from './grid/rule.js'
import PanelGrid from './grid/panel.js'
import TableGrid from './grid/table.js'
import OverlapGrid from './grid/overlap.js'
import Grid3dGrid from './grid/grid3d.js'
import CoreBrush from './brush/core.js'
import MapCoreBrush from './brush/map/core.js'
import PolygonCoreBrush from './brush/polygon/core.js'
import CanvasCoreBrush from './brush/canvas/core.js'
import CoreWidget from './widget/core.js'
import MapCoreWidget from './widget/map/core.js'
import PolygonCoreWidget from './widget/polygon/core.js'
import CanvasCoreWidget from './widget/canvas/core.js'

jui.use([
    DomUtil, MathUtil, ColorUtil, UICollection, UIManager, UICore,
    TimeUtil, TransformUtil, CanvasUtil, CanvasHidpiUtil, SvgElementUtil, SvgTransformElementUtil, SvgPathElementUtil, SvgPathRectElementUtil, SvgPathSymbolElementUtil,
    SvgPolyElementUtil, SvgBaseUtil, SvgBase3dUtil, SvgUtil, LinearScaleUtil, CircleScaleUtil, LogScaleUtil, OrdinalScaleUtil, TimeScaleUtil, ScaleUtil,
    Vector, Draw, Axis, Map, Builder, Plane, Animation, CorePolygon, GridPolygon, LinePolygon, PointPolygon, CubePolygon,
    Draw2dGrid, Draw3dGrid, CoreGrid, BlockGrid, DateGrid, DateBlockGrid, FullBlockGrid, RadarGrid, RangeGrid, LogGrid, RuleGrid, PanelGrid, TableGrid, OverlapGrid, Grid3dGrid,
    CoreBrush, MapCoreBrush, PolygonCoreBrush, CanvasCoreBrush, CoreWidget, MapCoreWidget, PolygonCoreWidget, CanvasCoreWidget
]);

var _ = jui.include("util.base"),
    manager = jui.include("manager");

_.extend(jui, manager, true);

export default jui;