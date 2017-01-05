$(document).ready(function(){
	$.SRA = function(sra_id){
		this.base_url = "ftp://ftp.ncbi.nlm.nih.gov/sra/sra-instant/reads/ByRun/sra/";
		this.d1_list = ["SRR", "DRR", "ERR"];
		this.id = "";
		this.page_url = "";
		this.download_url = "";
		this.init = function(sra_id){
			this.id = sra_id
			this.page_url = this.get_pg_url()
			this.download_url = this.get_dl_url()
		};
		this.get_pg_url = function(sra_id){
			sra_id = sra_id || this.id
			var d1 = sra_id.substr(0,3);
			var d2 = sra_id.substr(0,6);
			return this.base_url + d1 + "/" + d2 + "/" + sra_id + "/";
		};
		this.get_dl_url = function(sra_id){
			sra_id = sra_id || this.id
			var file = sra_id+".sra";
			return this.page_url + file;
		};
		this.init(sra_id);
	};
	function show_result(sra_id){
		
		var sra = new $.SRA(sra_id);
		$("#url").text(sra.download_url);
		$("#page").attr('href',sra.page_url);
		$("#result").show();
	};
	function show_msg(msg){
		$("#error").html(msg);
		$("#error").show();
	}
	function check_sra_id(sra_id){
		$.ajax({
				type: "GET",
				url : "check_id.php",
				data : {sra_id:sra_id},
				success : function(msg, status) {
					if (msg == "True"){
						show_result(sra_id);
					}
					else{
						console.log(msg);
						show_msg(sra_id + " 不是一个有效SRA号，请检查!");
					}
				},
				error: function(msg, status) {
					console.log(msg);
					show_msg(" 验证服务器无法对该ID做验证，下方url仅做参考，建议跳转至原网页下载!");
					show_result(sra_id);
				}
			});
	};
	$("#create").click(function(){
		$("#error").hide();
		$("#result").hide();
		var sra_id = $("#sra").val();
		check_sra_id(sra_id);
	});
	$("#download").click(function(){
		var url = $("#url").html();
		window.open(url);
	});
})